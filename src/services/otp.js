import { prisma } from "../db/prisma-client.js";
import { sendOtpEmail } from "../utils/emails/core/otp.js";
import { generateRandomOTP } from "../utils/helper.js";

async function sendUserOtpVerification(name, email, id) {
  await prisma.$transaction(
    async (tx) => {
      const nextFiveMinutesDate = new Date();

      nextFiveMinutesDate.setMinutes(nextFiveMinutesDate.getMinutes() + 1);

      const payload = {
        otp: generateRandomOTP(),
        name,
        email,
        expiredAt: nextFiveMinutesDate,
      };

      const otp = Number(payload.otp);

      await tx.user.update({
        where: { id },
        data: { otp, expiredAt: nextFiveMinutesDate },
      });

      await sendOtpEmail({
        otp,
        email,
        name,
      });
    },
    { timeout: 30000 }
  );
}

async function verifyOTP({ otp, email }) {
  const verifyingUser = await prisma.user.findFirst({
    where: {
      otp,
      email,
    },
  });
  if (!verifyingUser) {
    return { status: 401 };
  }
  console.log(verifyingUser.expiredAt);
  console.log(new Date());
  if (new Date() >= verifyingUser.expiredAt) {
    return { status: 422 };
  }

  const userId = verifyingUser.id;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        otp: null,
        verified: true,
      },
    });
  });

  return { status: 200 };
}

export const OtpService = {
  sendUserOtpVerification,
  verifyOTP,
};
