const router = require( "express" ).Router()
const generesController = require("../controllers/generesController")
const authMiddlewares = require("../middlewares/authMiddlewares")


router.post( "/",authMiddlewares.verifyAdmin, generesController.addAGeneres )
router.get( "/", generesController.getAllgeneres )
router.put( "/generesId",authMiddlewares.verifyAdmin, generesController.changeAGeneres )
router.delete( "/:generesId",authMiddlewares.verifyAdmin, generesController.deleteAGeneres )


module.exports = router