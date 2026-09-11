import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateExistingUser } from "../../services/auth.service.js";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/oauth/google/callback",
}, async (_accessToken, _refreshToken, profile, done) => {
    const user = await findOrCreateExistingUser(profile);
    return done(null, user);
}));
//# sourceMappingURL=google.strategy.js.map