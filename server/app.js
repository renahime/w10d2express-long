const express = require('express');
const router = express.Router();
const app = express();
const dogs = require('./routes/dogs');

require('express-async-errors');

app.use(express.json());
app.use(express.static("assets"));
app.use("/dogs" , dogs);


// router.get('/dogs' , (req, res) => {
//   res.send("test");
// })


app.use("/",(req,res,next)=>{
  console.log("meth: ", req.method);
  console.log("url: ", req.url);

  res.on('finish', () => {
    console.log("status:", res.statusCode);
  });
  next();
})

app.use((req,res,next)=>{
  const error = new Error("The requested resource couldn't be found.");
  error.statusCode = 404;
  console.log(error.message);
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
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
