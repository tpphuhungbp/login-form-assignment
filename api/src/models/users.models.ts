import mongoose from "mongoose";
import { IUser } from "../types";

const UserSchema = new mongoose.Schema<IUser>({
  password: {
    type: String,
    required: false,
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
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
});

export const User = mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);
