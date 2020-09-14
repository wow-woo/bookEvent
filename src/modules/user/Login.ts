import { MyContext } from "./../../../types/MyContext";
import { User } from "./../../entities/User";
import { LoginInput } from "./login/LoginInput";
import { Arg, Query, Resolver, Ctx } from "type-graphql";

@Resolver()
export class LoginResolver {
  @Query(() => User, { nullable: true })
  async login(
    @Arg("data", () => LoginInput) { email }: LoginInput,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    req.session!.userId = user.id;

    return user;
  }
}
