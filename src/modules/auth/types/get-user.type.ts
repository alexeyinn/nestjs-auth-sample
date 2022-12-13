import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class GetUserType {
  @Field()
  lastName: string;

  @Field()
  firstName: string;

  @Field()
  email: string;

  @Field()
  patronymic: string;

  @Field()
  department: string;

  @Field()
  position: string;

  @Field()
  role: string;

  @Field()
  photo: string;
}
