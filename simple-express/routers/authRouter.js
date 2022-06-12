const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
const bcrypt = require("bcrypt");
// npm i express-validator
const { body, validationResult } = require("express-validator");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  //storage destination
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "members"));
  },
  filename: function (req, file, cb) {
    console.log("multer filename", file);
    let ext = file.originalname.split(".").pop();
    let newFilename = `${Date.now()}` + `${ext}`;
    cb(null, newFilename);
  },
  //rename
});

const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      cb("sdfsdf", false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 200 * 1024,
  },
});

const registerRules = [
  body("email").isEmail().withMessage("Email 欄位請填寫正確格式"),
  body("password").isLength({ min: 8 }).withMessage("密碼長度至少為8"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼驗證不一致"),
];

// /api/auth/register
router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    // 1. req.params <-- 網址上的路由參數
    // 2. req.query  <-- 網址上的 query string
    // 3. req.body <-- 通常是表單 post 用的
    console.log("register body: ", req.body);

    // 驗證資料
    // 拿到驗證結果
    const validateResults = validationResult(req);

    console.log("validateResults", validateResults);
    if (!validateResults.isEmpty()) {
      // 不是 empty --> 表示有不符合
      let error = validateResults.array();
      return res.status(400).json({ code: 3001, error: error });
    }

    // TODO: 確認 email 有沒有註冊過
    let [members] = await pool.execute(
      "SELECT id, email FROM members WHERE email = ?",
      [req.body.email]
    );

    if (members.length !== 0) {
      // email has been registered
      return res
        .status(400)
        .json({ code: 3002, mesage: "the email is already registered" });
    }

    // TODO: 密碼雜湊 hash
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashPassword: ", hashPassword);

    console.log("req.file: ", req.file);

    let photo = req.file ? "/members/" + req.file.filename : "";
    // TODO: save to db
    let [result] = await pool.execute(
      "INSERT INTO members (email, password, name, photo) VALUES (?,?,?,?)",
      [req.body.email, hashPassword, req.body.name, photo]
    );
    console.log("insert result: ", result);

    // response
    res.json({ code: 0, result: "OK" });
  }
);

// /api/post
router.post("/login", async (req, res, next) => {
  // make sure data is received
  console.log("req.body: ", req.body);
  // confirm whether there is an account or not
  // if not, error
  // if yes, check password
  // if password = false, error
  // if password = true, everyone's happy

  let [members] = await pool.execute(
    "SELECT id,email,password,name,photo FROM members WHERE email = ?",
    [req.body.email]
  );
  if (members.length === 0) {
    // email has been registered
    return res.status(400).json({
      code: 3003,
      mesage: "Either the email or password is incorrect",
    });
  }
  let member = members[0];
  console.log("member: ", member);
  let passwordCompareRsult = await bcrypt.compare(
    req.body.password,
    member.password
  );
  if (passwordCompareRsult === false) {
    return res
      .status(400)
      .json({ code: 3004, error: "Either the email or password is incorrect" });
  }
  res.json({
    code: 0,
    member: { email: member.email, name: member.name, photo: member.photo },
  });
});

module.exports = router;
