import { createCheckoutSession } from "../services/checkout.service.js";
export async function createNewCheckoutSession(req, res) {
    const userId = Number(req.authUser.userId);
    userId;
    try {
        const result = await createCheckoutSession(userId);
        res.status(200).json({ url: result });
    }
    catch (err) {
        console.error("STRIPE ERROR:", err);
        res.status(500).json({
            message: err.message,
            type: err.type,
        });
    }
}
//# sourceMappingURL=checkout.controller.js.map