import { prisma } from "../db/prisma-client.js";

async function isAdmin(req, res, next) {
  const user = await prisma.user.findUnique({});
  if (user.role !== "admin") {
    return res.status(409).json({ message: "Forbidden to entry" });
  }
  next();
}

export const AuthMiddleWare = {
  isAdmin,
};
