import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('base')
export class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  expiryDate: Date;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  reagentUnit: string;

  @Field()
  @Column()
  reagentPurity: string;

  @Field()
  @Column()
  standard: string;

  @Field()
  @Column()
  batchNumber: string;

  @Field()
  @Column()
  dateOfManufacture: Date;

  @Field()
  @Column()
  arrivalDate: Date;

  @Field()
  @Column()
  invoice: string;

  @Field()
  @Column()
  manufacturer: string;

  @Field()
  @Column()
  provider: string;

  @Field()
  @Column({ nullable: true })
  comment: string;

  @Field()
  @Column()
  warningPeriod: string;
}
