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
    type: [Schema.Types.ObjectId],
  },
  enemies: {
    type: [Schema.Types.ObjectId],
  },
  image: {
    type: String,
  },
});

export const User = model("User", UserSchema, "users");
