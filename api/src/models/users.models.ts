import mongoose from "mongoose";
import { IUser } from "../types";

const UserSchema = new mongoose.Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  googleAuth: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
});

export const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
