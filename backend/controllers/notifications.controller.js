import { getAllNotificationsService } from "../services/notifications.service.js";
export async function getAllNotificationsController(req, res) {
    const userId = Number(req.authUser.userId);
    userId;
    try {
        const notifications = await getAllNotificationsService(userId);
        return res.status(200).json({ notifications: notifications });
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
//# sourceMappingURL=notifications.controller.js.map