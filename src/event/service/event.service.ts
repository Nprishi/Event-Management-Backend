import { Event } from "../model/event.model";
import {
  getCachedEvents,
  setCachedEvents,
  clearEventsCache,
} from "../../cache/cache.service";

export async function createEvent(data: any, userId: string) {
  const event = await Event.create({
    ...data,
    createdBy: userId,
  });

  await clearEventsCache();

  return event;
}

export async function getAllEvents() {
  return Event.find();
}

export async function getPublishedEvents() {
  // 1. check cache first
  const cached = await getCachedEvents();

  if (cached) {
    return cached;
  }

  // 2. fetch from DB
  const events = await Event.find({ status: "published" });

  // 3. store in cache
  await setCachedEvents(events);

  return events;
}

export async function getEventById(id: string) {
  return Event.findById(id);
}

export async function updateEvent(id: string, data: any) {
  const event = await Event.findByIdAndUpdate(id, data, { new: true });

  await clearEventsCache();

  return event;
}

export async function deleteEvent(id: string) {
  const event = await Event.findByIdAndDelete(id);

  await clearEventsCache();

  return event;
}
