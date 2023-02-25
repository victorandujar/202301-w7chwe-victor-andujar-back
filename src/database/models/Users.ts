import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  friends: {
    type: String,
  },
  enemies: {
    type: String,
  },
});

export const User = model("User", UserSchema, "users");
