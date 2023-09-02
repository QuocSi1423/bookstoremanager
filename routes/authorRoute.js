const router = require( "express" ).Router()
const authorController = require( "../controllers/authorController" )
const authMiddleware = require( "../middlewares/authMiddlewares" )

router.get( "/", authorController.getAuthor )
router.post("/",authMiddleware.verifyAdmin,authorController.createAuthor)

module.exports = router