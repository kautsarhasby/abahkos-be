import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { boardingRoute } from "./routes/boarding.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/boarding", boardingRoute);

server.listen(process.env.PORT, () => {
  console.log("server start at server : http://localhost:", process.env.PORT);
});
