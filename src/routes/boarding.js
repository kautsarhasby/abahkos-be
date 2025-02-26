import express from "express";
import { prisma } from "../db/prisma-client.js";

export const boardingRoute = express.Router();

boardingRoute.get("/", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();

    return res
      .status(200)
      .json({ message: "Success Retrieveng Data", data: rooms });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

boardingRoute.get("/:uuid", async (req, res) => {
  const params = req.params;
  try {
    const room = await prisma.room.findFirst({
      where: { roomUuid: params.uuid },
    });

    return res
      .status(200)
      .json({ message: "Success Retrieveng Data", data: room });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });
    return res.status(500).json({ message: "Something went wrong" });
  }
});

boardingRoute.post("/", async (req, res) => {
  try {
    const { roomNumber, floor, type, facilities, price, description, status } =
      req.body;
    await prisma.room.create({
      data: { roomNumber, floor, type, facilities, price, description, status },
    });

    return res.status(200).json({
      message: "Data berhasil di masukkan",
    });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
});

boardingRoute.put("/:id", async (req, res) => {
  const { roomNumber, floor, type, facilities, price, description, status } =
    req.body;
  try {
    await prisma.room.update({
      where: { id: Number(req.params.id) },
      data: { roomNumber, floor, type, facilities, price, description, status },
    });

    return res.status(200).json({
      message: "Data berhasil diperbarui",
    });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
});

boardingRoute.delete("/:id", async (req, res) => {
  try {
    await prisma.room.delete({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });

    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
});
