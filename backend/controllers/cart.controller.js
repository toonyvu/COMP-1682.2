import * as cartService from "../services/cart.service.js";
export async function addItem(req, res) {
    const { mealkitId } = req.body;
    const userId = Number(req.authUser.userId);
    ("Adding item!");
    try {
        await cartService.addItem(userId, mealkitId);
        const result = await cartService.getFullCart(userId);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json(err || { message: "Failed to add item to cart." });
    }
}
export async function removeItem(req, res) {
    const { mealkitId } = req.body;
    const userId = Number(req.authUser.userId);
    try {
        await cartService.removeItem(userId, mealkitId);
        const result = await cartService.getFullCart(userId);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to delete item from cart." });
    }
}
export async function alterQty(req, res) {
    const { mealkitId, qty } = req.body;
    const userId = Number(req.authUser.userId);
    try {
        await cartService.updateQty(Number(userId), Number(mealkitId), Number(qty));
        const result = await cartService.getFullCart(Number(userId));
        res.status(201).json({ result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to update quantity." });
    }
}
export async function getCart(req, res) {
    const userId = Number(req.authUser.userId);
    userId;
    try {
        const result = await cartService.getFullCart(userId);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get cart information." });
    }
}
export async function clearCart(req, res) {
    const userId = Number(req.authUser.userId);
    try {
        await cartService.clearCart(userId);
        const result = await cartService.getFullCart(userId);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json({ message: "Failed to get cart information." });
    }
}
//# sourceMappingURL=cart.controller.js.map