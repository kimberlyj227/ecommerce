const User = require("../models/user");
const braintree = require("braintree")
require("dotenv").config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
});

exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if(err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  });
};