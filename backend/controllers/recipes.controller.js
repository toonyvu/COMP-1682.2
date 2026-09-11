import { getRecipeDetails, createRecipeService, getAllRecipesAdmin, getRecipeAdmin, editRecipeService, } from "../services/recipes.service.js";
export async function getRecipes(req, res) {
    req;
    const userId = req.authUser.userId;
    userId;
    const { id } = req.params;
    const { mealkitId } = req.query;
    if (!id)
        return res.status(400).json({ message: "Invalid request." });
    try {
        id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ message: "Invalid Recipe ID." });
        }
        const result = await getRecipeDetails(Number(id), userId);
        return res.status(200).json(result);
    }
    catch (err) {
        err;
        return res.status(500).json({
            message: err.message,
        });
    }
}
export async function createRecipeController(req, res) {
    const { recipe, ingredients, steps } = req.body;
    recipe;
    ingredients;
    steps;
    try {
        const result = await createRecipeService(recipe, ingredients, steps);
        return res.status(200).json(result);
    }
    catch (err) {
        err;
        return res.status(500).json(err.message);
    }
}
export async function getRecipesAdminController(req, res) {
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) || 1;
    const search = String(req.query.search);
    try {
        const result = await getAllRecipesAdmin(page, limit, search);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
export async function getRecipeAdminController(req, res) {
    const { id } = await req.params;
    try {
        const result = await getRecipeAdmin(Number(id));
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
export async function editRecipeAdminController(req, res) {
    const { recipe, ingredients, steps } = req.body;
    try {
        await editRecipeService(recipe, ingredients, steps);
        return res.sendStatus(204);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
//# sourceMappingURL=recipes.controller.js.map