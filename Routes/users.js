const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64.js");
const SHA256 = require("crypto-js/sha256");

const User = require("../Models/User.js");

router.post("/user/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const isAlreadyinDb = await User.countDocuments({ email: email });

    if (isAlreadyinDb) {
      res.status(400).json({ message: "User already in database" });
      return;
    }

    if (!username) {
      res.status(400).json({ message: "Please enter a username" });
      return;
    }

    const password = req.body.password;
    const newsletter = req.body.newsletter;
    const salt = uid2(16);
    const token = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    const userSignedup = new User({
      email: email,
      account: {
        username: username,
      },
      newsletter: newsletter,
      token: token,
      hash: hash,
      salt: salt,
    });

    await userSignedup.save();

    res
      .status(200)
      .json({ message: "Request received", infoLogded: userSignedup });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;
    const userData = await User.findOne({ email: reqEmail });
    const userSalt = userData.salt;
    const hashedrequestPassword = SHA256(reqPassword + userSalt).toString(
      encBase64
    );

    if (hashedrequestPassword === userData.hash) {
      res.status(200).json({
        _id: userData._id,
        token: userData.token,
        account: {
          username: userData.account.username,
        },
      });
    } else {
      res.status(400).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
