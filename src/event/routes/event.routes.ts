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

// PUBLIC (only published events)
eventRouter.get("/", getEventsHandler);

// PUBLIC but controlled (handler must block draft access)
eventRouter.get("/:id", getEventByIdHandler);

// PROTECTED ROUTES
eventRouter.post("/", requireAuth, createEventHandler);
eventRouter.patch("/:id", requireAuth, updateEventHandler);
eventRouter.delete("/:id", requireAuth, deleteEventHandler);
