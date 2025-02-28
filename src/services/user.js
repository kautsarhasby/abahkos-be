import { prisma } from "../db/prisma-client.js";

async function createUser(payload) {
  const { name, email, gender, password } = payload;
  const user = await prisma.user.create({
    data: { name, email, gender, password },
  });

  return user;
}

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function getUser(id) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}

async function getUserByAuth(payload) {
  const { email, password } = payload;
  const user = await prisma.user.findFirst({
    where: { AND: [{ email, password }] },
  });
  return user;
}

async function updateUser(payload, id) {
  const { name, email, gender, password } = payload;
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, email, gender, password },
  });

  return updatedUser;
}
async function deleteUser(id) {
  await prisma.user.delete({
    where: { id },
  });
}

export const UserService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByAuth,
};
