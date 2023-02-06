const { body } = require("express-validator");

const validateCreateAnimal = [
  body("parent").optional().isMongoId(),
  body("label").exists().isString(),
];

module.exports = validateCreateAnimal;
