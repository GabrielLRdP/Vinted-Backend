require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);
const cors = require("cors");
app.use(cors());

const userRoute = require("./Routes/users.js");
const publishRoute = require("./Routes/offer/publish.js");
const offersRoute = require("./Routes/offers.js");

app.use(userRoute);
app.use(publishRoute);
app.use(offersRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log("server has started");
});
