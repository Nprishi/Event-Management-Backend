import { Event } from "../model/event.model";

export async function createEvent(data: any, userId: string) {
  return Event.create({
    ...data,
    createdBy: userId,
  });
}

export async function getAllEvents() {
  return Event.find();
}

export async function getPublishedEvents() {
  return Event.find({ status: "published" });
}

export async function getEventById(id: string) {
  return Event.findById(id);
}

export async function updateEvent(id: string, data: any) {
  return Event.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteEvent(id: string) {
  return Event.findByIdAndDelete(id);
}
