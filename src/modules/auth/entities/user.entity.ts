import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';

@ObjectType()
@Entity('user')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  patronymic: string;

  @Column()
  @Field()
  department: string;

  @Column()
  @Field()
  position: string;

  @Column()
  @Field()
  phone: string;

  @Column({ nullable: true })
  @Field()
  photo: string;

  @Column()
  @Field()
  hash: string;

  @Column({ nullable: true })
  @Field()
  hashedRt: string;

  @Field(() => [Number])
  @ManyToOne(() => RoleEntity, (role) => role.user)
  role: RoleEntity;
}
