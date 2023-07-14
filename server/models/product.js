const mongoose = require('mongoose');
const slugify = require('slugify');

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    description: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      require: true,
    },
    ratings: [
      {
        star: { type: Number },
        comment: { type: String },
        postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add pre-save hook to generate slug based on the title field
productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
    locale: 'vi',
  });
  next();
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
