import { loginSchema, registerSchema } from "../../schema/schema.js";
import { UserService } from "../services/user.js";

async function register(req, res) {
  const payload = await req.body;
  const validated = registerSchema.safeParse(payload);
  if (!validated.success)
    return res
      .status(401)
      .json({ message: "Failed to create account", error: validated.error });

  const user = await UserService.createUser(validated.data);

  return res
    .status(200)
    .json({ message: "Success created account", data: user });
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
