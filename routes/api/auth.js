const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();
// @route       GET api/auth
// @description Test route
// @access      Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route       POST api/auth
// @description Authenticate user & get token
// @access      Public
router.post("/", [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password").exists(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      (err, token) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send("Server Error");
        }
        res.json({ token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
