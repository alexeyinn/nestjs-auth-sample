import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateBaseInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  expiryDate: Date;

  @Field()
  amount: number;

  @Field()
  reagentUnit: string;

  @Field()
  reagentPurity: string;

  @Field()
  standard: string;

  @Field()
  batchNumber: string;

  @Field()
  dateOfManufacture: Date;

  @Field()
  arrivalDate: Date;

  @Field()
  invoice: string;

  @Field()
  manufacturer: string;

  @Field()
  provider: string;

  @Field({ nullable: true })
  comment: string;

  @Field()
  warningPeriod: string;
}
