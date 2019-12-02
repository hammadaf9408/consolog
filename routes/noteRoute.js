const express = require('express');
const {
  getAllNote,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
// const advancedResults = require('../middleware/advanceResults');
// const NoteModel = require('../models/NoteModel');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllNote)
  .post(createNote);
router
  .route('/:id')
  .get(getSingleNote)
  .put(updateNote)
  .delete(deleteNote);

  module.exports = router;