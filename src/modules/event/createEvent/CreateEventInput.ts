import { Field, InputType, Float } from "type-graphql";

@InputType()
export class CreateEventInput {
  @Field()
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  date: string;

  @Field(() => Float)
  price: number;
}
