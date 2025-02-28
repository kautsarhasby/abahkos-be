import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { roomRoute } from "./routes/room.js";
import process from "process";
import { userRoute } from "./routes/user.js";
import { authRoute } from "./routes/auth.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/rooms", roomRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

server.listen(process.env.PORT, () => {
  console.log("server start at server : http://localhost:", process.env.PORT);
});
