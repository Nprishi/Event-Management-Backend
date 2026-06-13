import express from "express";
import cors from "cors";
import morgan from "morgan";
import { authRouter } from "./auth/routes/auth.routes";
import { eventRouter } from "./event/routes/event.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Health route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Event API is running",
  });
});

app.use("/auth", authRouter);
app.use("/events", eventRouter);

export default app;