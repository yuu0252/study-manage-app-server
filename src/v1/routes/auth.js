const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const validation = require("../middlewares/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../middlewares/tokenHandler");

router
  .post
  // '/register', body('username').isLength({min: 2}).withMessage('ユーザ名は2文字以上である必要があります'),
  // body('password').isLength({min: 4}).withMessage('パスワードは4文字以上である必要があります');
  ();
