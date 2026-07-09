import "dotenv/config";
import cookieParser from "cookie-parser";

import cors from "cors";
import express from "express";
import passport from "passport";

import "./auth/strategies/google.strategy.js";
import "./auth/strategies/facebook.strategy.js";

import authRoutes from "./routes/auth.routes.js";
import mealkitRoutes from "./routes/mealkits.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import webhookRoutes from "./routes/webhook.routes.js";
import subscriptionRoutes from "./routes/subscriptions.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(passport.initialize());

app.use(cookieParser());

app.use("/webhook", express.raw({ type: "application/json" }), webhookRoutes);

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/auth", authRoutes);
app.use("/mealkits", mealkitRoutes);
app.use("/recipes", recipeRoutes);
app.use("/cart", cartRoutes);
app.use("/create-checkout-session", checkoutRoutes);
app.use("/create-subscription-session", subscriptionRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.get("/test", (req, res) => {
  res.json({ working: true });
});

let ready: Promise<void>;
async function init() {
  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
      console.log("Express running on port ", PORT);
    });
  } else {
    ready = init();
  }
}

init();

export { app, ready };
