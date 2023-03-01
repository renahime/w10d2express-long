//PHASE 5. Nested Resources (Intermediate)
//created nested Express routers and connect them to an Express application or router
const express = require('express');
dogsRouter = require('./dogs');

// ------------------------------  SERVER DATA ------------------------------

let nextFoodId = 1;
function getNewFoodId() {
  const newFoodId = nextFoodId;
  nextFoodId++;
  return newFoodId;
}

const foods = [
  {
    foodId: getNewFoodId(),
    name: "Kibble",
    dogId: 1
  },
  {
    foodId: getNewFoodId(),
    name: "Bone",
    dogId: 1
  },
  {
    foodId: getNewFoodId(),
    name: "Biscuit",
    dogId: 2
  }
];

// ------------------------------  MIDDLEWARES ------------------------------

const validateFoodInfo = (req, res, next) => {
  if (!req.body || !req.body.name) {
    const err = new Error("Food must have a name");
    err.statusCode = 400;
    next(err);
  }
  next();
};

// ------------------------------  ROUTE HANDLERS ------------------------------

// GET /dogs/:dogId/foods
const getFoodsByDogId = (req, res) => {
  const { dogId } = req.params;
  res.json(foods.filter(food => food.dogId == dogId));
};

// POST /dogs/:dogId/foods
const createFood = (req, res) => {
  const { name } = req.body;
  const { dogId } = req.params;
  const newFood = {
    foodId: getNewFoodId(),
    name,
    dogId
  };
  foods.push(newFood);
  res.json(newFood);
};

// ------------------------------  ROUTER ------------------------------

// Your code here
const foodsRouter = express.Router({ mergeParams: true });
// This is because the dogId route parameter is defined in the route path in the dogs router,
// not the foods router. The foods router, though, needs access to the dogId route parameter to identify what
// dog it needs to fetch or create foods for. The mergeParams option enables the foods router to use the parameters
// defined in the outer router, the dogs router.

foodsRouter.get('/foods', (req,res) => getFoodsByDogId(req,res));

foodsRouter.post('/foods', validateFoodInfo, (req,res) => createFood(req,res));

module.exports = foodsRouter;
