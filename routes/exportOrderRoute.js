const router = require( "express" ).Router()
const exportOrderController = require("../controllers/exportOrderController")
const authMiddlewares = require("../middlewares/authMiddlewares")

router.get( "/",authMiddlewares.verifyAdmin, exportOrderController.getAllOrder )
router.get("/:orderId",authMiddlewares.verifyAdmin, exportOrderController.getAnOrder)
router.put( "/:orderId", authMiddlewares.verifyAdmin, exportOrderController.updateStatus )

module.exports = router