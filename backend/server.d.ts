import "dotenv/config";
import "./auth/strategies/google.strategy.js";
import "./auth/strategies/facebook.strategy.js";
declare const app: import("express-serve-static-core").Express;
declare let ready: Promise<void>;
export { app, ready };
//# sourceMappingURL=server.d.ts.map