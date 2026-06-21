import request from "supertest";
import { app, ready } from "../server.js";

import { test, expect, beforeAll } from "vitest";

let token: string;

beforeAll(async () => {
  await ready;

  const login = await request(app).post("/auth/login").send({
    email: "tony422005@gmail.com",
    password: "test123",
  });

  token = login.body.accessToken;
});

test("/GET user information returns 200", async () => {
  const id =
    "cs_test_a1tBWoxRDAjDrgJjsoGOG0OZb6fcT5MG2TOLfIdn9OJG4KX1zSMX9BcMW2";
  const res = await request(app)
    .get(`/orders/session/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
