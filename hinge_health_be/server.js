const express = require("express");

require("dotenv").config();
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const aws = require("aws-sdk");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const logger = require("./src/services/logger.service");
const animalController = require("./src/controllers/animal.controller");
const validators = require("./src/validators");

const basicAuthentication = basicAuth({
  users: { admin: "qwe123" }, // Hardcoded for testing
  challenge: true,
  unauthorizedResponse: "Error Unauthorized.",
});

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));
app.get("/", basicAuthentication, function (req, res) {
  res.status(200).send({ message: "OK", version: "20230205" });
});

app.post(
  "/api/tree",
  basicAuthentication,
  validators.createAnimal,
  animalController.createAnimal
);
app.get("/api/tree", basicAuthentication, animalController.getAnimals);

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at:", p, "reason:", reason);
});

mongoose.connect(
  process.env.DB_URL,
  {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (!err) {
      logger.debug("MONGO CONNECTED");
    } else {
      logger.debug("MONGO NOT CONNECTED");
    }
  }
);

const server = app.listen(3001, (err) => {
  if (err) {
    return console.error(err);
  }
  logger.debug("Listening on port:", server.address().port);
});
