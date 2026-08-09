import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

import type { JwtPayload } from "jsonwebtoken";

//LOGIN FLOW:
/* 

1. RECEIVE LOGIN REQUEST
2. VALIDATE INPUTS (Email, Password)
3. FIND USER IN DB USING EMAIL, RETURN ERROR IF NULL
4. COMPARE PASSWORD WITH BCRYPT, RETURN ERROR IF INCORRECT
5. GENERATE JWT TOKEN
6. SEND TOKEN, USER INFO TO FRONTEND.

*/
export async function login(req: Request, res: Response) {
  try {
    const { accessToken, user, refreshToken, role } = await authService.login(
      req.body.email,
      req.body.password,
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      user,
      role,
    });
  } catch (err: any) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

//SIGNUP FLOW:
/* 

1. CHECK REQUIRED FIELDS
2. CHECK IF EMAIL EXISTS (TRY-CATCH BLOCK)
3. HASH PASSWORD WITH BCRYPT
4. INSERT USER INTO THE DB
5. RETURN CREATED USER

*/
export async function signup(req: Request, res: Response) {
  // Destructure data from the request, check if these information are valid.
  const { username, email, password } = req.body;

  try {
    const user = await authService.signup(username, email, password);
    return res.status(201).json(user);
  } catch (err: any) {
    console.log(err.message);
    return res.status(err.status || 500).json({ error: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await authService.deleteRefreshToken(refreshToken);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully." });
}

export async function Callback(req: Request, res: Response) {
  const user = req.user as any;

  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" },
  );

  await authService.storeRefreshToken(user.id, refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect("http://localhost:3000/oauth/callback");
}

export async function refreshToken(req: Request, res: Response) {
  console.log("refresh reached");
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Missing refresh token",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
    ) as JwtPayload;

    const getTokenResult = await authService.getRefreshToken(refreshToken);

    if (!getTokenResult) {
      return res.status(401).json({
        message: "Invalid refresh token.",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return res.json({
      message: "Refreshed",
    });
  } catch {
    return res.status(401).json({
      message: "Invalid or expired refresh token.",
    });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const email = req.body.email;
  console.log(email);

  if (!email) {
    return res.status(401).json({ message: "Email is required." });
  }

  try {
    await authService.forgotPassword(email);

    return res.status(200).json({
      message:
        "If an account exists for that email address, we've sent a password reset link.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { token } = req.query;
  const { password } = req.body;

  if (!password) {
    return res.status(401).json({ message: "Password is required." });
  }

  try {
    await authService.resetPassword(password, String(token));
    return res.sendStatus(204);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
