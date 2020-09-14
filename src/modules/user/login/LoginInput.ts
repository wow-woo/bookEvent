import { InputType, Field } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  email: String;

  @Field()
  password: String;
}
