import { User } from "./../../entities/User";
import { MyContext } from "./../../../types/MyContext";
import { Query, Resolver, Ctx } from "type-graphql";

@Resolver()
export class meResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session?.userId) {
      return null;
    }

    const user = User.findOne(req.session?.userId);

    return user;
  }
}
