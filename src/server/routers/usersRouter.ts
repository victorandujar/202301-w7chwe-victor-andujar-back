import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/usersControllers.js";
import multer from "multer";

export const usersRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage });

usersRouter.get("/users", getUsers);
usersRouter.post("/register", upload.single("image"), registerUser);
usersRouter.post("/login", loginUser);
