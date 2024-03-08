const User = require("../Models/User.js");
const mongoose = require("mongoose");

const isAuthenticated = async (req, res, next) => {
  // console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");

    //console.log(token);

    const user = await User.findOne({ token: token });

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      req.user = user;
      return next();
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
