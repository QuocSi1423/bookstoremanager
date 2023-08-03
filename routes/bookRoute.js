const router = require( "express" ).Router()
const bookController = require( "../controllers/bookController" )
const authMiddlewares = require("../middlewares/authMiddlewares")

router.post( "/",authMiddlewares.verifyAdmin, bookController.addABook )
router.get("/:bookId",bookController.getABook)
router.get( "/", bookController.getAllBook ) 
router.put( "/:bookId",authMiddlewares.verifyAdmin, bookController.changeInfo )
router.delete( "/:bookId",authMiddlewares.verifyAdmin, bookController.deleteABook )

module.exports = router