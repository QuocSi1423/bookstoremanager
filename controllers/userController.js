const User = require( "../schemas/userSchema" )
const Cart = require("../schemas/cartSchema")
const bcrypt = require( "bcrypt" )
const jwt = require("jsonwebtoken")

const userController = {
    getAllUser: async ( req, res ) =>
    {
        try
        {
            const page = req.query.page || 1
            const limit = req.query.limit || 20

            const users = await User.find().skip((page-1)*limit).limit(limit)
            res.status(200).json({page:page, users:users})
        } catch (error) {
            res.status(500).json(error)
        }
    },
    register: async ( req, res ) =>
    {
        try
        {
            const hashPassword = bcrypt.hashSync(req.body.password,10)
            const newUser = new User( {...req.body,password:hashPassword,role:"user"} )
            const newCart = new Cart({userId:newUser._id})
            Promise.all([newUser.save(), newCart.save()])
            .then( () =>
            {
                res.status(200).json(newUser)
            })

        } catch (error) {
            res.status(500).json(error)
        }
    },
    login: async ( req, res ) =>
    {
        try {
            const user = await User.findOne( { mail: req.body.mail } )
            if ( !user )
            {
                return res.status( 404 ).json( "No User Found" )
            }
            if ( bcrypt.compareSync( req.body.password, user.password ) )
            {
                const accessToken = jwt.sign( {
                    id: user._id,
                    role:user.role
                },
                process.env.SECRET_KEY,
                {expiresIn:"20m"}
                )
                const {password,...others} = user._doc
                return res.status(200).json({...others,accessToken})    
            }
            res.status(401).json("Password isn's match")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    changeInfo: async ( req, res ) =>
    {
        try
        {
            const {cartId, role, ...others} = req.body
            const user = await User.findByIdAndUpdate( req.params.userId, others,{new:true} )
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = userController