const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const validation = require("../middlewares/validation");
