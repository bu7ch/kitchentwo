const router = require("express").Router(),
  coursesController = require("../controllers/courseController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.respondJSON,
);
router.use(coursesController.errorJSON)

module.exports = router;