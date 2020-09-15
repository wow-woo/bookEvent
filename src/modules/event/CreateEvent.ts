import { Event } from "./../sharedType/EventType";
import { isAuth } from "./../middleware/isAuth";
import { MyContext } from "./../../../types/MyContext";
import { EventModel } from "./../../db/models/EventModel";
import { CreateEventInput } from "./createEvent/CreateEventInput";
import { Mutation, Resolver, Arg, Ctx, UseMiddleware } from "type-graphql";

@Resolver()
export class CreateEventResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Event)
  async createEvent(
    @Arg("args") { date, description, title, price }: CreateEventInput,
    @Ctx() { req }: MyContext
  ): Promise<Event> {
    const userId = req.session!.userId;

    const event = await EventModel.create({
      title,
      description,
      date,
      price,
      creator: userId,
    });

    function getEvent({ _doc }: any): Event {
      return _doc;
    }

    const extractedEvent = getEvent(event);
    console.log("extractedEvent", extractedEvent);

    return extractedEvent;
  }
}
