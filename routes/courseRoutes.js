const router = require('express').Router(),
coursesController = require('../controllers/courseController');

router.get("/", coursesController.index);
router.get("/new", coursesController.new);
router.post("/create", coursesController.create);
router.get("/:id", coursesController.show);
router.get("/:id/edit", coursesController.edit);
router.post("/:id/update", coursesController.update);
router.get("/:id/delete", coursesController.delete);

module.exports = router;