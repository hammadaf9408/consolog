const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const UserModel = require('./models/UserModel');
const NoteModel = require('./models/NoteModel');
const CategoryModel = require('./models/CategoryModel');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const notes = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/notes.json`, 'utf-8')
);

// import into DB
const importData = async () => {
  try {
    await UserModel.create(users);
    // await NoteModel.create(notes);

    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await UserModel.deleteMany();
    await NoteModel.deleteMany();
    await CategoryModel.deleteMany();

    console.log('Data deleted...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// To do the seeder user *node seeder -
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
