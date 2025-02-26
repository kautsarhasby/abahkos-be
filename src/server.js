import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { roomRoute } from "./routes/room.js";
import process from "process";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/rooms", roomRoute);

server.listen(process.env.PORT, () => {
  console.log("server start at server : http://localhost:", process.env.PORT);
});
