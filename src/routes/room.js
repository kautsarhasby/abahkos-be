import express from "express";
import { RoomController } from "../controllers/room.js";

export const roomRoute = express.Router();

roomRoute.get("/", RoomController.getRooms);

roomRoute.get("/detail/:uuid", RoomController.getRoomByUuid);

roomRoute.post("/", RoomController.createRoom);

roomRoute.put("/:id", RoomController.updateRoom);

roomRoute.delete("/:id", RoomController.deleteRoom);
