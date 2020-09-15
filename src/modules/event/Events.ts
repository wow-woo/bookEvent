import { Event } from "./../sharedType/EventType";
import { EventModel } from "./../../db/models/EventModel";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class EventsResolver {
  @Query(() => [Event], { nullable: true })
  async events(): Promise<Event[] | null> {
    const event = await EventModel.find();

    if (event.length === 0) {
      return null;
    } else {
      function getEvent(docs: any): Event[] {
        return docs.map((doc: any) => {
          return doc._doc;
        });
      }

      const extractedEvent = getEvent(event);

      console.log(extractedEvent);

      return extractedEvent;
    }
  }
}
