const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
const blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("BlogCategory", blogCategorySchema);
