//Spread operator lets you combine all variables into a single array without explicitly typing it.
export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        const user = req.authUser;
        if (!user) {
            ("Yo");
            return res.status(401).json({
                message: "Unauthorized.",
            });
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                message: "Forbidden.",
            });
        }
        next();
    };
}
//# sourceMappingURL=requireRole.js.map