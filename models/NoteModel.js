const mongoose = require('mongoose');
const ErrorResponse = require('../utils/errorResponse');
const Category = require('./CategoryModel');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String
  },
  note: {
    type: String
  },
  category: {
    type: [String],
    // set: function(category) {
    //   this._prevCategory = this.category;
    //   return category;
    // }
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

NoteSchema.statics.getCategories = async function(userId, categories) {
  const item = await Category.findOne({ user: userId });
  let value = {
    category: categories,
    user: userId
  };

  // if category for own user is doesnt exist
  if (!item) {
    try {
      await Category.create(value);
      console.log('Add category-success');
    } catch (err) {
      console.log('err :', err);
      return next(new ErrorResponse(err, 401));
    }
  }

  if (item) {
    // Combine 2 array, prevent double value => make into 1 value
    const category = [...new Set([...categories, ...item.category])];
    // If there's atleast 1 category inside then we add to it
    if (item.category.length >= 1) {
      try {
        // console.log(category);
        if (category.length !== item.category.length || (category.length === item.category.length && category.sort().toString() !== item.category.sory().toString())) {
          await Category.updateOne(
            { _id: item._id },
            { category },
            { runValidators: true }
          );
          console.log('update category-success');
        }
      } catch (err) {
        console.log('err :', err);
        return next(new ErrorResponse(err, 401));
      }
    } else {
      try {
        // console.log(category);
        await Category.update(
          { _id: item._id },
          { category },
          { runValidators: true }
        );
          console.log('update category-success');
      } catch (err) {
        console.log('err :', err);
        return next(new ErrorResponse(err, 401));
      }
    }
  }
};

NoteSchema.statics.removeCategory = async function(props) {
  const noteModel = mongoose.model('Note', NoteSchema);
  let dataCategory = await Category.findOne({ user: props.userId });

  const filter = props.prevCategory.filter(item => !props.thisCategory.includes(item));
  // console.log('filter :', filter);

  if (filter) {
    try {
      filter.map(async item => {
        const count = await noteModel.countDocuments({ category: item, _id : {$ne : props.noteId} });
        if (count === 0) {
          const execute = dataCategory.category.filter(ctg => ctg !== item);
          // console.log('execute :', execute);
          dataCategory.set('category', execute);
          dataCategory.save();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};

NoteSchema.path('category').set(function(newVal) {
  this._prevCategory = this.category;
  return newVal;
});

// NoteSchema.pre('validate', function(next) {
//   next();
// });

NoteSchema.pre('save', async function(next) {
  if (this.isModified('category')) {
    // Need to maintenacne for this one. because there's still some bug
    // const props = {
    //   userId: this.user,
    //   noteId: this._id,
    //   prevCategory: this._prevCategory,
    //   thisCategory: this.category
    // };

    // this.constructor.removeCategory(props);
  }
  next();
});

// Process category when update
NoteSchema.post('save', function(doc, next) {
  // Need to change later for the bug with deleted category
  doc.constructor.getCategories(doc.user, doc.category);
  next();
});

module.exports = mongoose.model('Note', NoteSchema);
