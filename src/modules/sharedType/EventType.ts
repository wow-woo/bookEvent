import { ObjectType, ID, Field, Float } from "type-graphql";

@ObjectType()
export class Event {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  creator: string[];

  @Field(() => Date)
  date: string;
}
