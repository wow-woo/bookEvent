import "reflect-metadata";
import Express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { meResolver } from "./modules/user/Me";
import { __prod__ } from "./modules/constants/constants";
import { SignOutResolver } from "./modules/user/SingOut";
import { LogoutResolver } from "./modules/user/Logout";
import { LoginResolver } from "./modules/user/Login";
import { RegisterResolver } from "./modules/user/Register";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import RedisCli from "ioredis";
import { createConnection } from "typeorm";

const main = async () => {
  const app = Express();

  await createConnection();
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      SignOutResolver,
      meResolver,
    ],
    validate: false,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const RedisStore = await connectRedis(session);

  app.use(Express.json());

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: new RedisCli(),
      }),
      secret: process.env.SESSION_SECRET!,
      name: "qid",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, //24hours
        httpOnly: true,
        secure: __prod__, //
      },
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log("server is running on 4000"));
};
main().catch((err) => console.log(err));
