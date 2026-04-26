import "dotenv/config";

import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth.routes.js";
import mealkitRoutes from "./routes/mealkits.routes.js";
import recipeRoutes from "./routes/recipes.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/auth", authRoutes);
app.use("/dashboard", mealkitRoutes);
app.use("/recipes", recipeRoutes);
app.use("/cart", cartRoutes);
app.use("/create-checkout-session", checkoutRoutes);

console.log("Hello");

app.listen(PORT, () => {
  console.log("Express running on port ", PORT);
});
