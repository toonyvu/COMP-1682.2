import jwt from "jsonwebtoken";
export function authenticateToken(req, res, next) {
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated." });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.authUser = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}
//# sourceMappingURL=authenticateToken.js.map