const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/users/:userId", authController.deleteUser);
router.put("/users/:userId", authController.updateUser);

module.exports = router;