// npm i express
// 導入 express 這個模組
const express = require("express");
// 利用 epxress 來建立一個 express application
const app = express();

const path = require("path");

// 使用第三方開發的中間件 cors
const cors = require("cors");


require("dotenv").config();
let pool = require("./utils/db");
app.use(express.json());
const expressSession = require('express-session');
let FileStore = require('session-file-store')(expressSession);

app.use(
  expressSession({
    store: new FileStore({
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use('/images/members', express.static(path.join(__dirname, 'public', 'members')));


// client - server
// client send request -------> server
//                     <------- response
// request-response cycle
// client: browser, postman, nodejs,...

// express 是一個由 middleware (中間件) 組成的世界
// request --> middleware1 --> middleware2 --> .... --> response
// 中間件的「順序」很重要!!
// Express 是按照你安排的順序去執行誰是 next 的
// middleware 中有兩種結果：
// 1. next: 往下一個中間件去
// 2. response: 結束這次的旅程 (req-res cycle)

// express SSR 的做法
// 設定 express 視圖檔案放在哪裡
app.set("views", path.join(__dirname, "views"));
// 設定 express要用哪一種樣版引擎 (template engine)
// npm i pug
app.set("view engine", "pug");

// extended: false --> querystring
// extended: true --> qs
// app.use(express.urlencoded({ extended: true }));

// express 處理靜態資料
// 靜態資料: html, css 檔案, javascript 檔案, 圖片, 影音檔...
// express 少數內建的中間件 static
// 方法1: 不要指定網址
app.use(express.static(path.join(__dirname, "assets")));
// http://localhost:3001/images/test1.jpg
// 方法2: 指定網址 public
app.use("/public", express.static(path.join(__dirname, "public")));
// http://localhost:3001/aaa/images/callback-hell.png

// 一般中間件
app.use((request, response, next) => {
  console.log("我是一個沒有用的中間件 AAAA");
  next();

  // 兩個都有，那會發生什麼事？
  // 情況 1:
  // next();
  // response.send('我是中間件');

  // 情況 2:
  // response.send('我是中間件');
  // next();
});

app.use((request, response, next) => {
  console.log("我是一個沒有用的中間件 BBBB");
  next();
  // return
});

// HTTP request
// method: get, post, put, delete, ...
// 路由中間件
app.get("/", (request, response, next) => {
  console.log("首頁CCC");
  // 送回 response，結束了 request-response cycle
  response.send("首頁");
  // return
});

app.get("/about", (request, response, next) => {
  console.log("about");
  response.send("About Me");
});

app.get("/error", (req, res, next) => {
  // 發生錯誤，你丟一個錯誤出來
  // throw new Error('測試測試');
  // 或是你的 next 裡有任何參數
  next("我是正確的");
  // --> 都會跳去錯誤處理中間件
});

app.get("/ssr", (req, res, next) => {
  // 會去 views 檔案夾裡找 index.pug
  // 第二個參數: 資料物件，會傳到 pug 那邊去，pug 可以直接使用
  res.render("index", {
    stocks: ["台積電", "長榮", "聯發科"],
  });
});

const StockRouter = require("./routers/stockRouter");
app.use("/api/stocks", StockRouter);

const AuthRouter = require("./routers/authRouter");
app.use("/api/auth", AuthRouter);

const MemberRouter = require('./routers/memberRouter');
app.use("/api/member", MemberRouter);
// 這個中間件在所有路由的後面
// 會到這裡，表示前面所有的路由中間件都沒有比到符合的網址
// => 404
app.use((req, res, next) => {
  console.log("所有路由的後面 ==> 404", req.path);
  res.status(404).send("Not Found");
});

// 5xx
// 錯誤處理中間件: 通常也會放在所有中間件的最後
// 超級特殊的中間件
// 有點接近 try-catch 的 catch
app.use((err, req, res, next) => {
  console.error("來自四個參數的錯誤處理中間件", res.path, err);
  res.status(500).send("Server Error: 請洽系統管理員");
});

app.listen(3001, () => {
  console.log("Server start at 3001");
});
