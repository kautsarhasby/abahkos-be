import process from "process";
import { client, createEmailTemplate } from "./mail.js";
import dotenv from "dotenv";

dotenv.config();

export async function sendOtpEmail({ otp, name, email }) {
  const emailTemplate = await createEmailTemplate("otp");
  const parsedEmailTemplate = emailTemplate({ name, otp });

  try {
    await client.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "OTP Verification",
      html: parsedEmailTemplate,
    });

    console.log("suces");
  } catch (error) {
    console.log("gagal mengirim email", error);
  }
}
