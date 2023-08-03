const router = require( "express" ).Router()
const userController = require( "../controllers/userController" )
const authMiddlewares = require( "../middlewares/authMiddlewares" )
const cartController = require("../controllers/cartController")
const exportOrderController = require("../controllers/exportOrderController")


router.get( "/",authMiddlewares.verifyAdmin, userController.getAllUser )
router.post("/register",userController.register)
router.post( "/login", userController.login )
router.put( "/:userId", authMiddlewares.verifyIdentityAndAdmin, userController.changeInfo )

//cart
router.get("/:userId/cart",authMiddlewares.verifyIdentityAndAdmin,cartController.getItems)
router.put("/:userId/cart",authMiddlewares.verifyIdentityAndAdmin, cartController.clear)
router.post( "/:userId/cart/items",authMiddlewares.verifyIdentityAndAdmin, cartController.addAnItem)
router.put("/:userId/cart/items/:itemId",authMiddlewares.verifyIdentityAndAdmin,cartController.changeQuantityOfAnItem)


//order
router.post( "/:userId/orders/", authMiddlewares.verifyIdentity, exportOrderController.createAnOrder )
router.get("/:userId/orders/:orderId",authMiddlewares.verifyIdentity,exportOrderController.getAnOrder)
router.get( "/:userId/orders", authMiddlewares.verifyIdentity, exportOrderController.getAllOrderOfAnUser )


module.exports = router