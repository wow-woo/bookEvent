import { isAuth } from "./../middleware/isAuth";
import { LogoutInput } from "./logout/LogoutInput";
import { MyContext } from "./../../../types/MyContext";
import { User } from "./../../entities/User";
import { Mutation, Arg, Resolver, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class SignOutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async signout(
    @Arg("data", () => LogoutInput) { email, password }: LogoutInput,
    @Ctx() { req, res }: MyContext
  ) {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return null;
    }

    await user.remove();

    return new Promise((resolve, reject) => {
      req.session?.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        res.clearCookie("qid");

        return resolve(true);
      });
    });
  }
}
