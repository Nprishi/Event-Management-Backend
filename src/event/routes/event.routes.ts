import { Router } from "express";
import {
  createEventHandler,
  getEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controller/event.controller";

import { requireAuth } from "../../middleware/requireAuth";
import { upload } from "../../middleware/upload";
import { updateEvent } from "../service/event.service"; 

export const eventRouter = Router();

// PUBLIC (only published events)
eventRouter.get("/", getEventsHandler);

// PUBLIC but controlled (handler must block draft access)
eventRouter.get("/:id", getEventByIdHandler);

// PROTECTED ROUTES
eventRouter.post("/", requireAuth, createEventHandler);

// Banner Upload
eventRouter.post(
  "/:id/banner",
  requireAuth,
  upload.single("banner"),
  async (req, res) => {
    try {
      const eventId = req.params.id as string;
      const filePath = req.file?.path;

      if (!filePath) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const updatedEvent = await updateEvent(eventId, {
        banner: filePath,
      });

      res.json({
        message: "Banner uploaded successfully",
        event: updatedEvent,
      });
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  },
);

eventRouter.patch("/:id", requireAuth, updateEventHandler);
eventRouter.delete("/:id", requireAuth, deleteEventHandler);
