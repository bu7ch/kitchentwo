const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  connectFlash = require("connect-flash"),
  expressSessions = require("express-session"),
  cookieParser = require("cookie-parser"),
  router = require("./routes/index"),
  User = require("./models/user");

const mongoose = require("mongoose");
const passport = require("passport");
const dbURL = "mongodb://localhost:27017/";
const dbName = "kitchen_db";
mongoose.Promise = global.Promise;
mongoose
  .connect(dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`[Mongo connected !!]`))
  .catch((err) => {
    console.log(Error, err.message);
  });

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser("CuisineAdministration"));
app.use(
  expressSessions({
    secret: "CuisineAdminstration",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
