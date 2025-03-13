import { loginSchema, registerSchema } from "../../schema/schema.js";
import { AuthServices } from "../services/auth.js";
import { OtpService } from "../services/otp.js";
import { UserService } from "../services/user.js";
import { response } from "express";

async function register(req, res) {
  const payload = await req.body;
  const validated = registerSchema.safeParse(payload);
  if (!validated.success)
    return res
      .status(401)
      .json({ message: "Failed to create account", error: validated.error });

  const user = await UserService.createUser(validated.data);

  if (user.verified) {
    return res
      .status(409)
      .json({ message: "Account already registered", error: validated.error });
  }

  await OtpService.sendUserOtpVerification(user.name, user.email, user.id);

  return res.status(200).json({
    message: "Register Success, waiting for OTP verification",
    data: user,
  });
}

async function login(req, res) {
  const payload = await req.body;
  const validated = loginSchema.safeParse(payload);
  if (!validated.success)
    return res
      .status(401)
      .json({ message: "Failed to login", error: validated.error });

  const user = await UserService.getUserByAuth(validated.data);
  if (user === null) {
    return res.status(404).json({ message: "Wrong Password or Email" });
  }

  const token = await AuthServices.generateToken(user.id);

  // res as Response
  res.set("authorized", token);

  return res.status(200).json({ message: "Success login account", data: user });
}

async function otpVerification(req, res) {
  const { otp, email } = await req.body;

  const otpPayload = await OtpService.verifyOTP({ otp, email });

  if (otpPayload.status === 422) {
    return res.status(422).json({ message: "OTP expired, please re-send" });
  }
  if (otpPayload.status === 401) {
    return res.status(401).json({ message: "Wrong OTP" });
  }

  return res.status(200).json({ message: "otp verified", data: otpPayload });
}

async function resendOTP(req, res) {
  const { name, email, id } = await req.body;

  await OtpService.sendUserOtpVerification(name, email, id);

  return res.status(200).json({
    message: "Resend OTP Success, please check your email",
  });
}

export const AuthController = {
  register,
  login,
  otpVerification,
  resendOTP,
};
