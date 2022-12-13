import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  patronymic: string;

  @Field()
  department: string;

  @Field()
  position: string;

  @Field()
  phone: string;
}
