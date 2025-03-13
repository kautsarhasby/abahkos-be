import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

async function generateToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "10m",
  });
  return token;
}

export const AuthServices = {
  generateToken,
};
