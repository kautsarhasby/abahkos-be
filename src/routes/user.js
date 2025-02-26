import express from "express";
import { prisma } from "../db/prisma-client.js";

export const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res
      .status(200)
      .json({ message: "Success Retrieveng Data", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
});

userRoute.post("/", async (req, res) => {
  try {
    const { email, name, password, gender } = req.body;
    await prisma.user.create({
      data: { email, name, gender, password },
    });

    return res.status(200).json({
      message: "Data berhasil di masukkan",
    });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
});
