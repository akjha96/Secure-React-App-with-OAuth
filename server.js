const express = require("express");
require("dotenv").config();
var jwt = require("express-jwt"); // Validate JWT and set req.user
var jwks = require("jwks-rsa"); // Retrieve RSA Keys from JSON web Key Set (JWKS) endpoint

const app = express();

var jwtCheck = jwt({
  // Dynamically provinde signing key based on the key in the header
  // And the signing key provided by the JWKS endpoint
  secret: jwks.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 times per minute
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in Auth0 dashboard under your app's
  // advanvce setting under the Auth0 tab
  algorithms: ["RS256"],
});

// app.use(jwtCheck);

app.get("/public", (req, res) => {
  res.json({
    message: "Hello from a public API!",
  });
});

app.get("/private", jwtCheck, (req, res) => {
  res.json({
    message: "Hello from a private API!",
  });
});

app.listen(3001);
console.log(
  "API server is listening on " + process.env.REACT_APP_AUTH0_API_URL
);
