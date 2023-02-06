let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let AnimalSchema = new Schema({
  label: {
    type: String,
    required: true,
    default: "",
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: null,
  },
  root: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Animal", AnimalSchema);
