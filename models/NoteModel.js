const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  note: {
    type: String
  },
  category: {
    type: String
  },
  label: {
    type: String
  },
  // dueDate: {
  //   type: String
  // },
  // attachFile: {
  //   type: File
  // },
  // checklist: {
  //   type: Array
  // },
  achieve: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // createdBy: {
  //   type: String
  // }
});

module.exports = mongoose.model('Note', NoteSchema);
