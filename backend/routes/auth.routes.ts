import { Router } from "express";
import {
  login,
  signup,
  googleCallback,
  refreshToken,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import passport from "passport";
import { getUserInfo } from "../services/users.service.js";

const router = Router();

router.post("/login", (req, res) => {
  console.log("Login route hit!");
  login(req, res);
});

router.get(
  "/oauth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/login",
  }),
  googleCallback,
);

router.post("/signup", (req, res) => {
  console.log("Signup route hit!");
  signup(req, res);
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ success: true });
});

router.post("/refresh", refreshToken);

router.get("/me", authenticateToken, async (req, res) => {
  const userId = (req as any).authUser.userId;
  const user = await getUserInfo(userId);
  res.json({ user });
});

export default router;
