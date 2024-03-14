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
router.get(
  "/:categoryId/memos/:memoId",
  tokenHandler.verifyToken,
  memoController.getOne
);
router.put(
  "/:categoryId/memos/:memoId",
  tokenHandler.verifyToken,
  memoController.update
);
router.delete(
  "/:categoryId/memos/:memoId",
  tokenHandler.verifyToken,
  memoController.delete
);

module.exports = router;
