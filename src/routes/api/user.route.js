const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/api/user.controller");

router.get("/:id/sendEmail", usersController.getList);
router.get("/", usersController.index);
router.get("/:id", usersController.show);
router.get("/username/:username", usersController.showUsername);
router.post("/create", usersController.create);
router.put("/:id", usersController.update);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.destroy);
module.exports = router;
