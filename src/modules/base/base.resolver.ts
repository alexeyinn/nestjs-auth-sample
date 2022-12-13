import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseService } from './base.service';
import { BaseEntity } from './entities';
import { UpdateBaseInput } from './inputs';

@Resolver('Base')
export class BaseResolver {
  constructor(private readonly baseService: BaseService) {}

  @Query(() => [BaseEntity])
  async getAllReagents(): Promise<BaseEntity[]> {
    return await this.baseService.findAll();
  }

  @Query(() => BaseEntity)
  async getOneReagent(
    @Args('id', { type: () => Int }) id: number
  ): Promise<BaseEntity> {
    return await this.baseService.findOne(id);
  }

  @Mutation(() => Number)
  async removeOneReagent(
    @Args('id', { type: () => Int }) id: number
  ): Promise<number> {
    return await this.baseService.delete(id);
  }

  @Mutation(() => BaseEntity)
  async updateBase(
    @Args('updateBaseInput') updateBaseInput: UpdateBaseInput
  ): Promise<BaseEntity> {
    return await this.baseService.edit(updateBaseInput);
  }
}
