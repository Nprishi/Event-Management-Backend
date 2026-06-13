import { Router } from "express";
import {
  createEventHandler,
  getEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controller/event.controller";

import { requireAuth } from "../../middleware/requireAuth";

export const eventRouter = Router();

// Public route (published only)
eventRouter.get("/", getEventsHandler);

// Protected routes
eventRouter.post("/", requireAuth, createEventHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.patch("/:id", requireAuth, updateEventHandler);
eventRouter.delete("/:id", requireAuth, deleteEventHandler);
