import { Worker } from "bullmq";
import fs from "fs";
import path from "path";

const connection = {
  host: "127.0.0.1",
  port: 6380,
};

export const eventWorker = new Worker(
  "eventQueue",
  async (job) => {
    console.log("Processing job:", job.id);

    // simulate heavy task
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const filePath = path.join(
      __dirname,
      "../../exports",
      `event-${job.data.eventId}.json`
    );

    const data = {
      message: "Event processed successfully",
      eventId: job.data.eventId,
      processedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log("Job completed. File created:", filePath);
  },
  { connection }
);