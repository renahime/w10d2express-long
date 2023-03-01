const express = require('express');
const app = express();
const dogs = require('./routes/dogs'); // We don't need to add the dogs food because it's implicity included in this file
require("dotenv");
require("dotenv").config();

require('express-async-errors');


// PHASE 1. Boilerplate Express Middleware (Basic)
// familiarize yourself with some boilerplate Express middleware and how to use them in an Express application


//Express.json is a middleware that allows you to easily parse the incoming body of the request as JSON.
//It deserializes the JSON into a JavaScript object for you when connected.
app.use(express.json());
//Express.static is a middleware that allows you to easily serve static files from your Express server.
app.use(express.static("assets"));
app.use("/dogs" , dogs);





// router.get('/dogs' , (req, res) => {
//   res.send("test");
// })

// PHASE 2. Creating Express Middleware (Basic)
// create Express middleware and connect them to an Express application

app.use("/",(req,res,next)=>{
  console.log("method: ", req.method);
  console.log("url: ", req.url);
  // Question: Can you guess what the URL path for the assets/images/dog1.jpg file will be?
  // The server should send the assets/images/dog1.jpg file to the URL path of http://localhost:5000/static/images/dog1.jpg.


  // To trigger a callback function that will read and log the status code of the response when the response is sent,
  // create an event listener for the finish event on the response object:

  res.on('finish', () => {
    console.log("status:", res.statusCode);
  });
  next();
})

app.use((req,res,next)=>{
  const error = new Error("The requested resource couldn't be found.");
  error.statusCode = 404;
  console.log(error.message);
  then(error);
})

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
// The express-async-errors is not a middleware,
// but is useful for making sure that asynchronous
// middleware or route handlers will handle errors properly.

app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});


// PHASE 4. Development vs. Production Error Handling (Intermediate)
// handle Express errors differently depending on the environment

app.use((err,req,res,next)=>{

  const status = err.status || 500;

  const devResponse = {
    message: "Something went wrong",
    statusCode: status,
    stack: err.stack
  }
  const prodResponse = {
    message: "Something went wrong",
    statusCode: status
  }
  console.log(process.env.NODE_ENV)
  console.log(process.env.PORT)

  res.json(process.env.NODE_ENV == "development" ? devResponse : prodResponse);
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
