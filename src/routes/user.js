import express from "express";
import { UserController } from "../controllers/user.js";

export const userRoute = express.Router();

userRoute.get("/", UserController.getUsers);
userRoute.get("/:id", UserController.getUser);
userRoute.post("/", UserController.createUser);
userRoute.put("/:id", UserController.updateUser);
userRoute.delete("/:id", UserController.deleteUser);
