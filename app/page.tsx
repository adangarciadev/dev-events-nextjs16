import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}
const Page = async () => {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    const data = await response.json();
    const events = data.events ?? [];

    return (
      <section>
        <h1 className="text-center">
          The Hub for Every Dev <br /> Event You Can&apos;t Miss
        </h1>
        <p className="mt-5 text-center">
          Hackathons, Meetups, and Conferences. All in One Place{" "}
        </p>
        <ExploreBtn />
        <div className="mt-20 space-y-7">
          <h3>Featured Events</h3>

          <ul className="events">
            {events &&
              events.length > 0 &&
              events.map((event: IEvent) => (
                <li key={event.slug}>
                  {" "}
                  <EventCard {...event} />
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <section>
        <h1 className="text-center">Unable to load events</h1>
        <p className="mt-5 text-center">
          Please try again later or contact support if the problem persists.
        </p>
      </section>
    );
  }
};

export default Page;
