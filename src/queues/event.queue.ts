import { Queue } from "bullmq";

export const eventQueue = new Queue("eventQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6380,
  },
});

export async function addPublishEventJob(eventId: string) {
  await eventQueue.add("publish-event", {
    eventId,
  });

  console.log("Job added to queue:", eventId);
}
