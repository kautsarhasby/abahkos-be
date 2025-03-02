import { loginSchema, registerSchema } from "../../schema/schema.js";
import { OtpService } from "../services/otp.js";
import { UserService } from "../services/user.js";

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

  return res
    .status(200)
    .json({
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

  return res.status(200).json({ message: "Success login account", data: user });
}

export const AuthController = {
  register,
  login,
};
