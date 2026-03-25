import * as authService from "../services/auth.service.js";

import type { Request, Response } from "express";

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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
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
    return res.status(err.status || 500).json({ error: "Signup failed." });
  }
}
