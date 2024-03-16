const router = require("express").Router();
const openAiController = require("../controllers/openAi");

router.post("/chat", openAiController.chat);
