import redisClient from "../config/redis";

const EVENTS_CACHE_KEY = "events:published";

export async function getCachedEvents() {
  const data = await redisClient.get(EVENTS_CACHE_KEY);

  if (data) {
    console.log("CACHE HIT");
    return JSON.parse(data);
  }

  console.log("CACHE MISS");
  return null;
}

export async function setCachedEvents(events: any) {
  await redisClient.set(EVENTS_CACHE_KEY, JSON.stringify(events), {
    EX: 60, // expire in 60 seconds
  });
}

export async function clearEventsCache() {
  await redisClient.del(EVENTS_CACHE_KEY);
}
