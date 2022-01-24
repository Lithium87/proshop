import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler (async (req, res) => {
  const products = await Product.find ({});
  res.json (products);
});

const getProductById = asyncHandler (async (req, res) => {
  const product = await Product.findById (req.params.id);

  if (product) {
    res.json (product);
  } else {
    res.status (404);
    throw new Error ('Product not found!');
  }
});

const deleteProduct = asyncHandler (async (req, res) => {
  const product = await Product.findById (req.params.id);

  if (product) {
    await product.remove ();
    res.json ({message: 'Product removed!'});
  } else {
    res.status (404);
    throw new Error ('Product not found!');
  }
});

const createProduct = asyncHandler (async (req, res) => {
  const product = new Product ({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save ();
  res.status (201).json (createdProduct);
});

const updateProduct = asyncHandler (async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById (req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.image = image;

    const updatedProduct = await product.save ();
    res.status (201).json (updatedProduct);
  } else {
    res.status (404);
    throw new Error ('Product not found');
  }
});

const createProductReview = asyncHandler (async (req, res) => {
  const {rating, comment} = req.body;

  const product = await Product.findById (req.params.id);

  if (product) {
    const alreadyReviewed = products.reviews.find (
      r => r.user.toString () === req.user._id.toString ()
    );

    if (alreadyReviewed) {
      res.status (400);
      throw new Error ('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number (rating),
      comment,
      user: req.user._id,
    };

    products.reviews.push (review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce ((acc, item) => item.rating + acc, 0) /
      products.reviews.length;

    await product.save ();
    res.status (201).json ({message: 'Review added'});
  } else {
    res.status (404);
    throw new Error ('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};