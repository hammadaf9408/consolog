const Note = require('../models/NoteModel');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get All Note
// @route   GET /api/v1/note
// @access  Private
exports.getAllNote = asyncHandler(async (req, res, next) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @desc    Get single Note
// @route   GET /api/v1/note/:id
// @access  Private
exports.getSingleNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Add note
// @route   POST /api/v1/note
// @access  Private
exports.createNote = asyncHandler(async (req, res, next) => {
  const note = await Note.create(req.body);

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Update note
// @route   PUT /api/v1/note/:id
// @access  Private
exports.updateNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
    );
  }

  note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Delete note
// @route   DELETE /api/v1/note/:id
// @access  Private
exports.deleteNote = asyncHandler(async (req, res, next) => {
  let note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
    );
  }

  note.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});