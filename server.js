const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser=require('cookie-parser');

//Route files
const companies = require(`./routes/companies`);
const interviews = require('./routes/interviews');
const auth = require('./routes/auth');

//load env vars
dotenv.config({path:"./config/config.env"});

//connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Mount routers
app.use(`/api/v1/companies`,companies);
app.use('/api/v1/interviews',interviews);
app.use('/api/v1/auth',auth);

const PORT=process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandles promise rejections
process.on('unhandledRejection',(err,promise)=> {
    console.log(`Error: ${err.message}`);
    //close server & exit process
    server.close(()=>process.exit(1));
});