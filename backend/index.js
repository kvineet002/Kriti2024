const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const { join, dirname } = require('path');
const { fileURLToPath } = require('url');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 3002;

connect(
  "mongodb+srv://auth-admin:AdHDOvAtNy8He2l3@cluster0.s875rof.mongodb.net/Kriti2024"
);
app.use(cors({
  origin: 'https://kriti2024.vercel.app', // Replace with your frontend's actual domain
  credentials: true,
}));
app.use(bodyParser.json());

// console.log('Static files directory:', join(__dirname, 'uploads'));
app.use('/uploads', express.static(join(__dirname, 'uploads')));


app.use("/api/users", userRoutes);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// // Google OAuth configuration
// passport.use(new GoogleStrategy({
//   clientID: '378825151338-d0kfg9ljmukqp568a7kpebespd6tbgn4.apps.googleusercontent.com',
//   clientSecret: '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',
//   callbackURL: 'http://localhost:3002/auth/google/callback',
//   passReqToCallback:true
// },
// (accessToken, refreshToken, profile, done) => {
//   return done(null, profile);
// }));

// // Express middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// // Initialize Passport and restore authentication state, if any, from the session.
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/', (req, res, next) => {
//   console.log(req.isAuthenticated()); // Log authentication status
//   next();
// });

// app.get('/', (req, res) => {
//   res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
// });

// // Mount the auth routes
// app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
