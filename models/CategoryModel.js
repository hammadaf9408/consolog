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
// CategorySchema.pre('save', function(next) {
//   if (this.isModified('category')) {
//     console.log('Ganti category');
//   }
//   next();
// });

module.exports = mongoose.model('Category', CategorySchema);
