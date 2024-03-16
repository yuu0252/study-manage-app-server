const tokenHandler = require("../middlewares/tokenHandler");
const memoController = require("../controllers/memo");

const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/categories", require("./category"));
router.use("/categories", require("./memo"));
router.use("/openai", require("./openAi"));

router.get("/allmemos", tokenHandler.verifyToken, memoController.getUserMemos);

module.exports = router;
