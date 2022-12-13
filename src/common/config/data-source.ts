import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { RoleEntity } from 'src/modules/auth/entities/role.entity';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `./src/common/config/env/.${process.env.NODE_ENV.trim()}.env`,
});

const Config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'chem_reagent',
  entities: [UserEntity, RoleEntity],
  synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' ? true : false,
  migrations: ['src/migrations/*{.ts,.js}'],
};

export const AppDataSource: DataSource = new DataSource(Config);
