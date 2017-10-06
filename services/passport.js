const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

// https://console.developers.google.com
passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({
			googleId: profile.id
		}).then((existingUser) => {
			if (existingUser) {
				// 이미 해당 프로필 아이디를 가지고 있다.
				done(null, existingUser);
			} else {
				// 해당 데이터를 가지고 있지 않다. 데이터를 저장하면 된다.
				new User({
					googleId: profile.id
				})
				.save()
				.then(user => done(null, user));		
			}
		})
	})
);