const router = require("express").Router();
const openAiController = require("../controllers/openAi");
const { verifyToken } = require("../middlewares/tokenHandler");

router.post("/chat", verifyToken, openAiController.chat);

module.exports = router;
