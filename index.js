const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  coursesController = require("./controllers/courseController"),
  router = express.Router();
const mongoose = require("mongoose");
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

router.get("/courses", coursesController.index);
router.get("/courses/new", coursesController.new);
router.post("/courses/create", coursesController.create);
router.get("/courses/:id", coursesController.show);
router.get("/courses/:id/edit", coursesController.edit);
router.put("/courses/:id/update", coursesController.update);
router.get("/courses/:id/delete", coursesController.delete);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
