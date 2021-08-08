const router = require('express').Router(),
userController = require('../controllers/userController');


router.get("/", userController.index);
router.get("/new", userController.new);
router.post("/create", userController.create);

router.get("/login", userController.login);
router.post("/login", userController.authenticate);
router.get("/logout", userController.logout);
router.get("/:id", userController.show);
router.get("/:id/edit", userController.edit);
router.post("/:id/update", userController.update);
router.get("/:id/delete", userController.delete);

module.exports = router;