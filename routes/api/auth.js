const express = require("express");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();
// @route       GET api/auth
// @description Test route
// @access      Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user)
  } catch (err) {
    console.error(error.message);
    res.status(500).json({msg: "Server Error"})
  }
});

module.exports = router;
