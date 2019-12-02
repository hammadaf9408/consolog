const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Route
const noteRoute = require('./routes/noteRoute');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();


const PORT = process.env.PORT || 5000;

const app = express();

// Dev logger middleware
if (process.env.NODE_ENV === 'development') {
  // This one is for showing the log of url on console *GET/POST/ETC URL STATUSCODE ....
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//  File uploading
app.use(fileupload());
// Set static folder, __dirname is current directory
app.use(express.static(path.join(__dirname, 'public')))

// Mount routes
app.use('/api/v1/note', noteRoute);

// Middleware it must bellow of the mount router, cause the process is linear. 
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `App listening in ${process.env.NODE_ENV} on port ${PORT} !`.cyan.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});