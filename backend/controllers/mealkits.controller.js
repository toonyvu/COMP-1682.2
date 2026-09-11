import { getAllMealkits, createMealkit } from "../services/mealkits.service.js";
export async function getMealKits(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const week = Number(req.query.week);
        const search = String(req.query.search ?? "");
        const tagIds = req.query.ids === undefined
            ? []
            : Array.isArray(req.query.ids)
                ? req.query.ids.map(Number)
                : [Number(req.query.ids)];
        const result = await getAllMealkits(page, limit, week, search, tagIds);
        res.status(200).json({
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Can't get recipes." });
    }
}
export const createMealkitController = async (req, res) => {
    ("create mealkit Controller reached");
    const { mealkitData } = req.body;
    if (!mealkitData)
        return;
    try {
        const result = await createMealkit(mealkitData);
        res.status(201).json({
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//# sourceMappingURL=mealkits.controller.js.map