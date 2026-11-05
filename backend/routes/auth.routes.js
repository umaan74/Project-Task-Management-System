
import express from "express";

import {
  Login,
  Logout,
  LogoutAll,
  Refresh,
  Register,
  GetCurrentUser,
} from "../controllers/auth.controller.js";

import { AuthMiddleware } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/refresh", Refresh);
authRouter.post("/logout", Logout);
authRouter.post("/logout-all", LogoutAll);

// Current logged-in user
authRouter.get("/me", AuthMiddleware, GetCurrentUser);

export default authRouter;
