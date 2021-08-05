const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  connectFlash = require("connect-flash"),
  expressSessions = require("express-session"),
  cookieParser = require("cookie-parser"),
  coursesController = require("./controllers/courseController"),
  subscriberController = require("./controllers/subsciberController"),
  userController = require("./controllers/userController");
User = require("./models/user");

router = express.Router();
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
  res.locals.flashMessages = req.flash();
  next();
});

router.get("/courses", coursesController.index);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create);
router.get("/courses/:id", coursesController.show);
router.get("/courses/:id/edit", coursesController.edit);
router.post("/courses/:id/update", coursesController.update);
router.get("/courses/:id/delete", coursesController.delete);

router.get("/subscribers", subscriberController.index);
router.get("/subscribers/new", subscriberController.new);
router.post("/subscribers/create", subscriberController.create);
router.get("/subscribers/:id", subscriberController.show);
router.get("/subscribers/:id/edit", subscriberController.edit);
router.post("/subscribers/:id/update", subscriberController.update);
router.get("/subscribers/:id/delete", subscriberController.delete);

router.get("/users", userController.index);
router.get("/users/new", userController.new);
router.post("/users/create", userController.create);

router.get("/users/login", userController.login);
router.post("/users/login", userController.authenticate);
router.get("/users/:id", userController.show);
router.get("/users/:id/edit", userController.edit);
router.post("/users/:id/update", userController.update);
router.get("/users/:id/delete", userController.delete);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
