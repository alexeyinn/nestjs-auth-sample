import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from './entities';
import { BaseResolver } from './base.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BaseEntity])],
  providers: [BaseService, BaseResolver],
})
export class BaseModule {}
