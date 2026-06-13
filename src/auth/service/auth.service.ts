import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return user;
}

export async function loginUser(
  email: string,
  password: string
) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
}