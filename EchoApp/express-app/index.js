//index.js
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
  

  
  app.use(dummyMiddleware);
  app.use(favouriteAnimal);


  
// 定義一個函數來反轉字母大小寫
function swapCase(str) {
    return str.split('').map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      } else {
        return char.toUpperCase();
      }
    }).join('');
  }
  

app.get('/', (req, res) => {
  res.send('Hello World, Nice to meet you!');
});

app.get("/favanimal", (req, res) => {
    res.send(`hello world, my favourite animal is ${res.favouriteAnimal}.`);
  });

// 設置路由處理 /echo/:message
app.get('/echo/:message', (req, res) => {
    const message = req.params.message;
    const swappedMessage = swapCase(message);
    res.json({ status: 'OK', message: swappedMessage });
  });
  
// 設置路由處理 /echo
app.get('/echo', (req, res) => {
    const message = req.query.msg;
    if (message) {
      const swappedMessage = swapCase(message);
      res.json({ status: 'OK', message: swappedMessage });
    } else {
      res.json({ status: 'error', message: 'no message' });
    }
  });

app.get('/user', (req, res) => {
    res.send('user page');
  });

  // 啟動伺服器
app.listen(port, () => {
  console.log(`Application started at port: ${port}`);
});
