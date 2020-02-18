const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Route
const noteRoute = require('./routes/noteRoute');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');

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

// Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

var whitelist = ['http://localhost:3006']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// enable Cors
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//  apply to all requests
app.use(limiter);

// Prevent http param pollution with Hpp
app.use(hpp());

// Mount routes
app.use('/api/v1/note', noteRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoryRoute);

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