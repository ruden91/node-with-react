const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

// connect mongoDB
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
)
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);