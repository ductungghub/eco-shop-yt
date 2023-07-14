const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", verifyAccessToken, ctrls.getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getUserOrder);
router.post("/", verifyAccessToken, ctrls.createOder);
router.put("/status/:oid", [verifyAccessToken, isAdmin], ctrls.updateStatus);

module.exports = router;
