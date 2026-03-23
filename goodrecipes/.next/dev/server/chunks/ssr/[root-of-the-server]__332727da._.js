module.exports = [
"[project]/Documents/PRJ/goodrecipes/app/favicon.ico.mjs { IMAGE => \"[project]/Documents/PRJ/goodrecipes/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/app/favicon.ico.mjs { IMAGE => \"[project]/Documents/PRJ/goodrecipes/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/PRJ/goodrecipes/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/PRJ/goodrecipes/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/Documents/PRJ/goodrecipes/hooks/useAuth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$components$2f$contexts$2f$AuthProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/components/contexts/AuthProvider.tsx [app-rsc] (ecmascript)");
;
;
const useAuth = ()=>{
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$components$2f$contexts$2f$AuthProvider$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthContext"]);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthContext.");
    }
    return ctx;
};
}),
"[project]/Documents/PRJ/goodrecipes/app/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/hooks/useAuth.ts [app-rsc] (ecmascript)");
;
;
function Dashboard() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useAuth"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PRJ$2f$goodrecipes$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            children: "Hello!"
        }, void 0, false, {
            fileName: "[project]/Documents/PRJ/goodrecipes/app/dashboard/page.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PRJ/goodrecipes/app/dashboard/page.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PRJ/goodrecipes/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Documents/PRJ/goodrecipes/app/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__332727da._.js.map