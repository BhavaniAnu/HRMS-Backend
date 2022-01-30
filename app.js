const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const app = express();
app.use(cors());

app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);
  
const port = process.env.PORT || 3000;

app.use(express.json());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

require('./routes')(app);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,useUnifiedTopology: true 
  })
  .then(()=> console.log('DB connection successful!'));

const server = app.listen(port, () => {
  const ENVIRONMENT = process.env.NODE_ENV || 'development';
  console.log(`Server Listening On Port, ${port}, ENVIRONMENT=${ENVIRONMENT}`);
});