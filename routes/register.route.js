const express = require("express");
const { register, registerPost } = require("../controllers/register.controller");
const router = express.Router();

router.get("/register", register);
router.post("/register", registerPost);

module.exports = router;