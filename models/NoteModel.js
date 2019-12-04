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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Process note when update
// NoteSchema.post('findOneAndUpdate', function(doc, next) {
//   // Running the avgrating
//   doc.constructor.getAverageRating(doc.bootcamp);
//   next();
// });

module.exports = mongoose.model('Note', NoteSchema);
