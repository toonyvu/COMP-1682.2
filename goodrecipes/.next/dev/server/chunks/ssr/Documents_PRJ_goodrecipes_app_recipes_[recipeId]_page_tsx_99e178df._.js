module.exports = [
"[project]/Documents/PRJ/goodrecipes/app/recipes/[recipeId]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Recipe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Recipe({ params }) {
    const [recipe, setRecipe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function getRecipe() {
            const { recipeId } = await params;
            const difficultyColor = {
                Easy: "bg-green-100 text-green-700",
                Medium: "bg-yellow-100 text-yellow-700",
                Hard: "bg-red-100 text-red-700"
            };
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].from("recipes").select("*").eq("id", {
                recipeId
            }).single();
            if (data) {
                setRecipe(data);
            }
        }
        getRecipe();
    }, []);
}
}),
];

//# sourceMappingURL=Documents_PRJ_goodrecipes_app_recipes_%5BrecipeId%5D_page_tsx_99e178df._.js.map