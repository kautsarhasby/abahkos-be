import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Haloo" });
});

server.listen(process.env.PORT, () => {
  console.log("server start at server : ", process.env.PORT);
});
