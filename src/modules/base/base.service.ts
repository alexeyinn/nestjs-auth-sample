import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntity } from './entities';
import { UpdateBaseInput } from './inputs';

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(BaseEntity)
    private readonly baseRepository: Repository<BaseEntity>
  ) {}

  async findAll(): Promise<BaseEntity[]> {
    return await this.baseRepository.find();
  }

  async findOne(id: number): Promise<BaseEntity> {
    return await this.baseRepository.findOne({ where: { id } });
  }

  async edit(dto: UpdateBaseInput): Promise<BaseEntity> {
    return await this.baseRepository.save({ ...dto });
  }

  async delete(id: number): Promise<number> {
    await this.baseRepository.delete({ id });
    return id;
  }
}
