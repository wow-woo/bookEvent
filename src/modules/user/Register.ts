import { MyContext } from "./../../../types/MyContext";
import { User } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";
import { Arg, Mutation, Resolver, Ctx } from "type-graphql";

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("args", () => RegisterInput)
    { email, name, password }: RegisterInput,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.create({
      name,
      email,
      password,
    }).save();

    req.session!.userId = user.id;

    return user;
  }
}
