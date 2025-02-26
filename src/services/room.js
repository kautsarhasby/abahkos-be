import { prisma } from "../db/prisma-client.js";

async function createRoom(payload) {
  const { roomNumber, floor, type, facilities, price, description, status } =
    payload;
  const rooms = await prisma.room.create({
    data: { roomNumber, floor, type, facilities, price, description, status },
  });

  return rooms;
}

async function getRooms() {
  const rooms = await prisma.room.findMany();
  return rooms;
}

async function getRoomByUuid(roomUuid) {
  const room = await prisma.room.findUnique({
    where: { roomUuid },
  });
  console.log(room);
  return room;
}
async function updateRoom(payload, id) {
  const { roomNumber, floor, type, facilities, price, description, status } =
    payload;
  const updatedRoom = await prisma.room.update({
    where: { id },
    data: { roomNumber, floor, type, facilities, price, description, status },
  });

  return updatedRoom;
}
async function deleteRoom(id) {
  await prisma.room.delete({
    where: { id },
  });
}

export const RoomService = {
  createRoom,
  getRooms,
  getRoomByUuid,
  updateRoom,
  deleteRoom,
};
