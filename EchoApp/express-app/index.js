const express = require('express');
const app = express();
const port = 3000;


const dummyMiddleware = (req, res, next) => {
    console.log("dummyMiddleWare is called..");
    next();
  };
  
  const favouriteAnimal = (req, res, next) => {
    res.favouriteAnimal = "Monkey";
    next();
  };
  
  const slowdown = (req, res, next) => {
    setTimeout(() => {
      next();
    }, 1000); // delay 1 seconds
  };
  
  app.use(dummyMiddleware);
  app.use(favouriteAnimal);
  app.use(slowdown);


// app.get('/', (req, res) => {
//   res.send('Hello World, Nice to meet you!');
// });

app.get("/", (req, res) => {
    res.send(`hello world, my favourite animal is ${res.favouriteAnimal}.`);
  });
  

app.get('/user', (req, res) => {
    res.send('user page');
  });

app.listen(port, () => {
  console.log(`Application started at port: ${port}`);
});
