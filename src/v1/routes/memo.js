const router = require("express").Router();
const tokenHandler = require("../middlewares/tokenHandler");
const memoController = require("../controllers/memo");

router.get(
  "/:categoryId/memos",
  tokenHandler.verifyToken,
  memoController.getAll
);
router.post(
  "/:categoryId/memos",
  tokenHandler.verifyToken,
  memoController.create
);

module.exports = router;
