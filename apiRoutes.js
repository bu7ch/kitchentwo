const router = require("express").Router(),
  coursesController = require("./controllers/courseController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.respondJSON,
  coursesController.errorJSON
);

module.exports = router;