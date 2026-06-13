import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    banner: {
      type: String,
      default: "",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export const Event = model("Event", eventSchema);
