import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '@trigger/nestjs';

@ObjectType({
  isAbstract: true,
})
export class User extends AbstractModel {
  @Field()
  email: string;
}
