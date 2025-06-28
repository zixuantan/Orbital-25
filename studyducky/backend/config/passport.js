import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

console.log("passport.js is being loaded");

const isProd = process.env.NODE_ENV === "production";

const CALLBACK_URL = isProd
	? process.env.CALLBACK_URL_PROD
	: process.env.CALLBACK_URL;

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			console.log("Inside GoogleStrategy verify function");
			console.log("Looking for user with googleId:", profile.id);

			try {
				let user = await User.findOne({ googleId: profile.id });

				if (!user) {
					console.log("No user found — creating new user in DB");
					user = await User.create({
						googleId: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						profilePicture: profile.photos[0].value,
						year: null,
						major: null,
						modulesTaken: [],
					});
					console.log("New user created:", user);
					user.isNew = true; // new user
				} else {
					console.log("User already exists:", user.email);
					user.isNew = false; // existing user
				}

				return done(null, user);
			} catch (err) {
				console.error("Error in GoogleStrategy:", err);
				return done(err, null);
			}
		}
	)
);

console.log("GoogleStrategy registered");

passport.serializeUser((user, done) => {
	console.log("serializeUser called for:", user.email);
	done(null, { id: user.id, isNew: user.isNew });
});

passport.deserializeUser(async (obj, done) => {
	console.log("deserializeUser called for _id:", obj.id);
	try {
		const user = await User.findById(obj.id);
		user.isNew = obj.isNew;
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

console.log("Serialization configured");
