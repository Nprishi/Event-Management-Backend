import { Request, Response } from "express";
import {
  createEvent,
  getPublishedEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../service/event.service";

// Extend Request type for auth user
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email?: string;
  };
}

export async function createEventHandler(req: AuthRequest, res: Response) {
  try {
    const event = await createEvent(req.body, req.user!.userId);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
}

export async function getEventsHandler(req: Request, res: Response) {
  const events = await getPublishedEvents();
  res.json(events);
}

export async function getEventByIdHandler(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const event = await getEventById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
}

export async function updateEventHandler(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const event = await updateEvent(id, req.body);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
}

export async function deleteEventHandler(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const event = await deleteEvent(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: (error as Error).message,
    });
  }
}
