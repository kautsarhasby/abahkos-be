import express from "express";
import { AuthController } from "../controllers/auth.js";

export const authRoute = express.Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.post("/otp", AuthController.otpVerification);
authRoute.post("/resend-otp", AuthController.resendOTP);
