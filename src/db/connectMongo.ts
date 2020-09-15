import mongoose from "mongoose";

export const connectMongo = () => {
  mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => console.log("db connected !!!"));
};
