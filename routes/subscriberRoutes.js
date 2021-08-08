const router = require('express').Router(),
subscriberController = require('../controllers/subsciberController');

router.get("/", subscriberController.index);
router.get("/new", subscriberController.new);
router.post("/create", subscriberController.create);
router.get("/:id", subscriberController.show);
router.get("/:id/edit", subscriberController.edit);
router.post("/:id/update", subscriberController.update);
router.get("/:id/delete", subscriberController.delete);

module.exports = router;