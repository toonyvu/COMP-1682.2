import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", (req, res) => {
  console.log("Login route hit!");
  login(req, res);
});

router.post("/signup", (req, res) => {
  console.log("Signup route hit!");
  signup(req, res);
});

export default router;
