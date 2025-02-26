import { RoomService } from "../services/room.js";

async function createRoom(req, res) {
  try {
    const room = await RoomService.createRoom(req.body);

    return res.status(201).json({
      data: room,
    });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
}

async function getRooms(req, res) {
  try {
    const rooms = await RoomService.getRooms();
    return res
      .status(200)
      .json({ message: "Success Retrieveng Data", data: rooms });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
async function getRoomByUuid(req, res) {
  try {
    const room = await RoomService.getRoomByUuid(req.params.uuid);
    return res
      .status(200)
      .json({ message: "Success Retrieveng Data", data: room });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });
    return res.status(500).json({ message: "Something went wrong", error });
  }
}

async function updateRoom(req, res) {
  try {
    const room = await RoomService.updateRoom(req.body, Number(req.params.id));
    return res.status(200).json({ message: "Success Update Data", data: room });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
async function deleteRoom(req, res) {
  try {
    await RoomService.deleteRoom(Number(req.params.id));
    return res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "Data tidak ditemukan" });

    return res.status(500).json({ message: "Terjadi kesalahan", error });
  }
}

export const RoomController = {
  createRoom,
  getRooms,
  getRoomByUuid,
  updateRoom,
  deleteRoom,
};
