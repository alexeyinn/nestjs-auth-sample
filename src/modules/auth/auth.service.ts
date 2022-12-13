import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/tokens.type';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import jwt_decode from 'jwt-decode';
import { IDecoded } from './interfaces';
import { AccessTokenType } from './types/access-token.type';
import { SignInInput } from './inputs/sign-in.input';
import { SignUpInput } from './inputs/sign-up.input';
import { Response } from 'express';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { GetUserType } from './types';
import { EditUserInput } from './inputs/edit-user.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private jwtService: JwtService
  ) {}

  async signUpLocal(
    sighinLocal: SignUpInput,
    response: Response
  ): Promise<AccessTokenType> {
    const hash = await this.hashData(sighinLocal.password);

    const preUser = new UserEntity();
    const role = await this.roleRepository.findOne({
      where: {
        value: sighinLocal.role,
      },
    });
    preUser.role = role;

    let newUser;
    try {
      newUser = await this.userRepository.save({
        ...sighinLocal,
        ...preUser,
        hash,
        email: sighinLocal.email.toLocaleLowerCase(),
      });
    } catch (error) {
      throw new ForbiddenException(
        'Пользователь с таким email уже существует! или ' + error
      );
    }

    return this.tokensProcessing(newUser, response.req.res);
  }

  async signInLocal(
    signInInput: SignInInput,
    response: Response
  ): Promise<AccessTokenType> {
    const user = await this.userRepository.findOne({
      where: { email: signInInput.email.toLowerCase() },
    });

    if (!user)
      throw new NotFoundException('Пользователя с таким email, не существует!');

    const passwordMatches = await bcrypt.compare(
      signInInput.password,
      user.hash
    );
    if (!passwordMatches) throw new ForbiddenException('Неверный пароль!');

    return this.tokensProcessing(user, response.req.res);
  }

  async getUser(userId): Promise<GetUserType> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role'],
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'patronymic',
        'department',
        'position',
        'photo',
        'phone',
      ],
    });

    const response = {
      ...user,
      role: user.role?.value,
    };

    return response;
  }

  async editUser(id: number, dto: EditUserInput): Promise<GetUserType> {
    await this.userRepository.save({
      id,
      email: dto.email.toLowerCase(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      patronymic: dto.patronymic,
      department: dto.department,
      phone: dto.phone,
      position: dto.position,
    });
    return await this.getUser(id);
  }

  async logout(userId: number): Promise<boolean> {
    await this.userRepository.save({ id: userId, hashedRt: null });
    return true;
  }

  async refreshTokens(context, res: Response): Promise<AccessTokenType> {
    try {
      const refreshToken: string = context.req.rawHeaders.at(-1).split('=')[1];
      const decoded: IDecoded = jwt_decode(refreshToken);

      if (!refreshToken) {
        throw new UnauthorizedException();
      }

      const user = await this.userRepository.findOne({
        where: { id: decoded.sub },
      });

      if (!user || !user.hashedRt)
        throw new ForbiddenException(
          'Пользователя с таким email, не существует!'
        );

      const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt);
      if (!rtMatches) throw new ForbiddenException('Доступ запрещен!');

      return this.tokensProcessing(user, res.req.res);
    } catch (error) {
      throw new ForbiddenException(
        'Проблемы с подтверждением вашей авторизацией. Попробуйте снова, или пройдите авторизацию заново! ' +
          error
      );
    }
  }

  async uploadAvatar(userId: number, readStream): Promise<string> {
    try {
      const stream = readStream();
      const chunks = [];

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function (chunk) {
          chunks.push(chunk);
        });

        stream.on('end', function () {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });

      const fileName = uuid.v4() + '.jpg';

      const avatarStorage = path.resolve(
        __dirname,
        '../../file-storage',
        'avatars'
      );
      if (!fs.existsSync(avatarStorage)) {
        fs.mkdirSync(avatarStorage, { recursive: true });
      }

      const { photo } = await this.userRepository.findOne({
        where: { id: userId },
      });
      this.userRepository.save({ id: userId, photo: fileName });

      fs.writeFileSync(path.join(avatarStorage, fileName), buffer);

      if (photo) {
        fs.unlinkSync(path.join(avatarStorage, photo));
      }

      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при сохранении аватарки:' + error,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeAvatar(userId: number): Promise<boolean> {
    const filePath = path.resolve(__dirname, '../../file-storage', 'avatars');

    const { photo } = await this.userRepository.findOne({
      where: { id: userId },
    });

    this.userRepository.save({ id: userId, photo: null });

    if (photo) {
      fs.unlinkSync(path.join(filePath, photo));
      return true;
    } else {
      throw new NotFoundException('Аватар для данного пользователя не найден');
    }
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: new ConfigService().get('AT_SECRET'),
          expiresIn: 60 * 15 * 24,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: new ConfigService().get('RT_SECRET'),
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }

  private hashData(data: string) {
    return bcrypt.hash(data, 5);
  }

  private async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.userRepository.save({ id: userId, hashedRt: hash });
  }

  async tokensProcessing(user, res): Promise<AccessTokenType> {
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    res.cookie('refreshToken', tokens.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { access_token: tokens.access_token };
  }
}
