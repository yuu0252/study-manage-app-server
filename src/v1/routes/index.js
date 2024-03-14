const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/categories", require("./category"));
router.use("/categories", require("./memo"));

module.exports = router;
