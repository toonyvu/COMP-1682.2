import { Router } from "express";
import { stripeWebhookController } from "../controllers/webhook.controller.js";

const router = Router();

router.post("/stripe", stripeWebhookController);

export default router;
