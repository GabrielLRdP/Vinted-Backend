const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Offer = require("../Models/Offer");

router.get("/offers", async (req, res) => {
  try {
    const itemsPerPage = 10;
    const sortType = {
      "price-asc": { product_price: "asc" },
      "price-desc": { product_price: "desc" },
      undefined: {},
    };
    let { page, title, priceMax, priceMin, sort } = req.query;
    //console.log(page, title, priceMax, priceMin, sort);

    const regExp = new RegExp(title, "i");

    console.log(title);

    if (!page) {
      page = 1;
    }

    if (!priceMin) {
      priceMin = 0;
    }

    if (!priceMax) {
      priceMax = 200000;
    }

    const offers = await Offer.find({
      product_name: regExp,
      product_price: { $gte: priceMin, $lte: priceMax },
    })
      .populate("owner", "account")
      .limit(itemsPerPage)
      .skip((page - 1) * itemsPerPage)
      .sort(sortType[sort]);

    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/offers/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate(
      "owner",
      "account"
    );

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
