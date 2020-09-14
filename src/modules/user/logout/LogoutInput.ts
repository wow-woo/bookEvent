import { InputType, Field } from "type-graphql";

@InputType()
export class LogoutInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
