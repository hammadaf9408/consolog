const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category: {
    type: [String]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

CategorySchema.index({ user: 1 });

// THIS ONE IS FUCKING WORK! UPDATE PAKE SAVE DAN FINDANDUPDATE EFEKNY GIMANA??
CategorySchema.pre('save', function(next) {
  console.log('Masuk pak ekoo');
  if (this.isModified('category')) {
    console.log('Ganti category');
  }
  next();
});

// NoteSchema.pre('findOneAndUpdate', function(next) {
//   if (this.isModified('category')) {
//     console.log('Ganti category');
//   }
//   next();
// });

// Call getAverageRating after save
// NoteSchema.post('save', function() {
//   // Running the avgrating
//   this.constructor.getCategories(this.user, this.category);
// });

module.exports = mongoose.model('Category', CategorySchema);
