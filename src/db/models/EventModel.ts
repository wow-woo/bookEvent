import mongoose from "mongoose";

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  creator: {
    // type: Schema.Types.ObjectId,
    type: String,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const EventModel = mongoose.model("Event", eventSchema);
