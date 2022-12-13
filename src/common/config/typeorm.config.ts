import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/auth/entities/role.entity';
import { UserEntity } from 'src/modules/auth/entities/user.entity';

export const TypeOrmConfigService = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: 5432,
    username: 'postgres',
    password: configService.get('POSTGRES_PASSWORD'),
    database: 'chem_reagent',
    entities: [UserEntity, RoleEntity],
    synchronize:
      configService.get('POSTGRES_SYNCHRONIZE') === 'true' ? true : false,
  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
