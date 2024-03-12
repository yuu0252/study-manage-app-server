const router = require("express").Router();
const tokenHandler = require("../middlewares/tokenHandler");
const categoryController = require("../controllers/category");

router.post("/create", tokenHandler.verifyToken, categoryController.create);

router.get("/", tokenHandler.verifyToken, categoryController.getAll);

router.get("/:categoryId", tokenHandler.verifyToken, categoryController.getOne);

router.put("/:categoryId", tokenHandler.verifyToken, categoryController.update);

router.delete(
  "/:categoryId",
  tokenHandler.verifyToken,
  categoryController.delete
);

module.exports = router;
