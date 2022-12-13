import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity('role')
export class RoleEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  value: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  user: UserEntity[];
}
