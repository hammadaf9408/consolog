const Category = require('../models/CategoryModel');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get category
// @route   GET /api/v1/category
// @access  Private
exports.getCategory = asyncHandler(async (req, res, next) => {

  const categories = await Category.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: categories
  });
});

// @desc    Update category
// @route   PUT /api/v1/category/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const data = await Category.findById(req.params.id);

  if (!data) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  if (data.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User is not authorize to update this note`, 401)
    );
  }

  data.category = data.category.filter(item => item !== req.body.category);

  await data.save();

  res.status(200).json({
    success: true,
    data
  });
});
