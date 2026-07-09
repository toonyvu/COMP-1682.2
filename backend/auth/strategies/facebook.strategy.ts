import { Strategy as FacebookStrategy } from "passport-facebook";
import type { Profile } from "passport-facebook";
import { findOrCreateExistingUser } from "../../services/auth.service.js";
import passport from "passport";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: "http://localhost:8080/auth/oauth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"],
    },

    async (_accessToken, _refreshToken, profile: Profile, cb) => {
      try {
        const user = await findOrCreateExistingUser(profile);
        return cb(null, user);
      } catch (err) {
        return cb(err as Error);
      }
    },
  ),
);
