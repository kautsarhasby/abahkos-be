import { prisma } from "../db/prisma-client.js";
import { sendOtpEmail } from "../utils/emails/core/otp.js";
import { generateRandomOTP } from "../utils/helper.js";

async function sendUserOtpVerification(name, email, id) {
  await prisma.$transaction(
    async (tx) => {
      const nextFiveMinutesDate = new Date();

      nextFiveMinutesDate.setMinutes(nextFiveMinutesDate.getMinutes() + 5);

      const payload = {
        otp: generateRandomOTP(),
        name,
        email,
      };

      const otp = Number(payload.otp);

      await tx.user.update({ where: { id }, data: { otp } });

      await sendOtpEmail({
        otp,
        email,
        name,
      });
    },
    { timeout: 30000 }
  );
}

export const OtpService = {
  sendUserOtpVerification,
};
