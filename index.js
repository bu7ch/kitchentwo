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
router.use(express.static("public"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cookieParser("CuisineAdministration"));
router.use(
  expressSessions({
    secret: "CuisineAdminstration",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

router.use(connectFlash());

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  console.log(res.locals.loggedIn);
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});



app.use("/", router);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
