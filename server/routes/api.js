const express = require('express');
const admin = require("firebase-admin");
const router = new express.Router();
const config = require('./../config');
admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: "https://hidden-founder.firebaseio.com"
});


router.get('/testapi', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});


router.post('/get-token', function (req, res) {

  var additionalClaims = {
    premiumAccount: true
  };

  admin.auth().createCustomToken(req.body.user_fb_id, additionalClaims)
    .then(function (customToken) {
       res.json(customToken);
    })
    .catch(function (error) {

      console.log("Error creating custom token:", error);

      res.status(500).json(error);

    });
});


module.exports = router;