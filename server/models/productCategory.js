const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    brand: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("ProductCategory", productCategorySchema);
