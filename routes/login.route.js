const express = require("express");
const { login, loginPost, logout } = require("../controllers/login.controller");
const router = express.Router();

router.get("/login", login);
router.get("/logout", logout);
router.post("/login", loginPost);

module.exports = router;