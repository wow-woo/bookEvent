import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "./../../../types/MyContext";
import { Mutation, Resolver, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean, { nullable: true })
  async logout(@Ctx() { req, res }: MyContext) {
    if (!req.session?.userId) {
      return null;
    }

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
