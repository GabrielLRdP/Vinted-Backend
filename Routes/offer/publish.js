const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2; // On n'oublie pas le `.v2` à la fin

// Données à remplacer avec les vôtres :
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

const isAuthenticated = require("../../Functions/IsAuthenticated.js");

const Offer = require("../../Models/Offer.js");

router.post(
  "/offer/publish",
  isAuthenticated,
  fileupload(),
  async (req, res) => {
    try {
      const { title, description, price, condition, city, brand, size, color } =
        req.body;
      const user = req.user;
      const pictureToUpload = req.files.picture;

      const offer = new Offer({
        product_name: title,
        product_description: description,
        product_price: price,
        product_details: [
          {
            MARQUE: brand,
          },
          {
            TAILLE: size,
          },
          {
            ÉTAT: condition,
          },
          {
            COULEUR: color,
          },
          {
            EMPLACEMENT: city,
          },
        ],
        owner: user._id,
      });

      const file = await cloudinary.uploader.upload(
        convertToBase64(pictureToUpload),
        { folder: `/vinted/offers/${offer._id}` }
      );

      offer.product_image = file;
      await offer.save();

      res.status(200).json({
        message: "Successfully published", //Fonctionne mais ne renvoie pas l'offre dans l'objet quand je tente de la populate()
        offer: offer,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

router.put(
  "/offer/publish/:id",
  isAuthenticated,
  fileupload(),
  async (req, res) => {
    try {
      // console.log(req.body);
      // console.log(req.files.picture);
      // console.log(req.params.id);

      const { title, description, price, condition, city, brand, size, color } =
        req.body;
      const user = req.user;
      const pictureToUpload = req.files.picture;
      console.log(pictureToUpload);
      //const file = req.files.picture;

      const offer = await Offer.findByIdAndUpdate(req.params.id, {
        product_name: title,
        product_description: description,
        product_price: price,
        product_details: [
          {
            MARQUE: brand,
          },
          {
            TAILLE: size,
          },
          {
            ÉTAT: condition,
          },
          {
            COULEUR: color,
          },
          {
            EMPLACEMENT: city,
          },
        ],
      });

      console.log(pictureToUpload.md5);
      console.log(offer.product_image.etag);

      if (pictureToUpload.md5 !== offer.product_image.etag) {
        cloudinary.uploader.destroy(`${offer.product_image.public_id}`);
        const file = await cloudinary.uploader.upload(
          convertToBase64(pictureToUpload),
          { folder: `/vinted/offers/${offer._id}` }
        );

        offer.product_image = file;
      }

      await offer.save();

      res
        .status(200)
        .json({ message: "Item sucessfully modified", item: offer });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

router.delete(
  "/offer/publish/:id",
  isAuthenticated,
  fileupload(),
  async (req, res) => {
    try {
      console.log(req.params.id);
      const offerToDelete = await Offer.findByIdAndDelete(req.params.id).then(
        console.log(req.params.id)
      );
      console.log(offerToDelete);
      cloudinary.api.delete_folder(`/vinted/offers/${req.params.id}`);

      res
        .status(200)
        .json({ message: "ite sucessfully deleted", item: offerToDelete });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

module.exports = router;
