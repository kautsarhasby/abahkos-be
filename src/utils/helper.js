import { randomInt } from "crypto";
import bcrypt from "bcrypt";

export function generateRandomOTP() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export async function hashPassword(password, salt = 10) {
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
