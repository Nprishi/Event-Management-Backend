import mongoose from "mongoose";

export async function connectDB() {
  console.log("URI:", process.env.MONGODB_URI);

  await mongoose.connect(process.env.MONGODB_URI!);

  console.log("MongoDB connected");
}
