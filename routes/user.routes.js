const express = require("express");
const { createUser, loginUser } = require("../controllers/user-controllers.js");

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", loginUser);

module.exports = router;
