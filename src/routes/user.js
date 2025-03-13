import express from "express";
import { UserController } from "../controllers/user.js";
import { AuthMiddleWare } from "../middlewares/auth.js";

export const userRoute = express.Router();

userRoute.get("/", AuthMiddleWare.isAdmin, UserController.getUsers);
userRoute.get("/:id", AuthMiddleWare.isAdmin, UserController.getUser);
userRoute.post("/", AuthMiddleWare.isAdmin, UserController.createUser);
userRoute.put("/:id", AuthMiddleWare.isAdmin, UserController.updateUser);
userRoute.delete("/:id", AuthMiddleWare.isAdmin, UserController.deleteUser);
