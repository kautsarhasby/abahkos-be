import { readFile } from "fs/promises";
import handleBars from "handlebars";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

handleBars.registerHelper("increment", (value) => parseInt(value, 10) + 1);

export const client = createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_API_KEY,
  },
});

export async function createEmailTemplate(template) {
  const rawEmail = await readFile(
    `./src/utils/emails/build/${template}.html`,
    "utf-8"
  );
  const parsedEmail = handleBars.compile(rawEmail);

  return parsedEmail;
}
