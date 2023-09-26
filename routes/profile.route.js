const express = require("express");
const { profile, editPic, updateProfile } = require("../controllers/profile.controller");
const router = express.Router();

router.get("/profile", profile);
router.post("/editPic", editPic);
router.post("/updateProfile", updateProfile);

module.exports = router;