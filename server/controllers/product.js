const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs');
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : 'Cannot create new product',
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : 'Cannot get product',
  });
});
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
  // 1A) Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  //1B) Advanced filtering
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  let formatedQueries = JSON.parse(queryString);
  //title  filter
  if (queryObj?.title)
    formatedQueries.title = { $regex: queryObj.title, $options: 'i' };
  let queryCommand = Product.find(formatedQueries);

  // 2) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    queryCommand = queryCommand.sort(sortBy);
  }

  //3) Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    queryCommand = queryCommand.select(fields);
  }

  // 4) Pagination
  // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;

  queryCommand = queryCommand.skip(skip).limit(limit);

  //Execute query
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Product.find(queryCommand).countDocuments();

    return res.status(200).json({
      success: response ? true : false,
      counts,
      productDatas: response ? response : 'Cannot get products',
    });
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : 'Cannot update product',
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : 'Cannot delete product',
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { star, comment, pid } = req.body;
  const { _id } = req.user;

  if (!star || !pid) throw new Error('Missing inputs');

  const product = await Product.findById(pid);

  const existingRating = product.ratings.find(
    (r) => r.postedBy.toString() === _id.toString()
  );

  if (existingRating) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: existingRating },
      },
      {
        $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
      },
      {
        new: true,
      }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: {
          ratings: { star, comment, postedBy: _id },
        },
      },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(pid);
  const numOfReviews = updatedProduct.ratings.length;
  const avgRating = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((avgRating * 10) / numOfReviews) / 10;

  await updatedProduct.save();
  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error('Missing files');
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    updatedProduct: response ? response : 'Cannot update images product',
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
