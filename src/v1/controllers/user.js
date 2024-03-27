const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

// ユーザの新規登録
exports.register = async (req, res) => {
  const password = req.body.password;

  try {
    // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザの新規作成
    const user = await User.create(req.body);
    // JWT発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 2592000,
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ログイン
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // ユーザがデータベースに存在するかチェック
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            path: "username",
            msg: "ユーザ名が無効です",
          },
        ],
      });
    }

    // パスワードの照合
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            path: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 2592000,
    });
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
