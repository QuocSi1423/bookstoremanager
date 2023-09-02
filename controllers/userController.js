const User = require( "../schemas/userSchema" )
const Cart = require("../schemas/cartSchema")
const bcrypt = require( "bcrypt" )
const jwt = require("jsonwebtoken")

const generateAccessToken = ( user ) =>
{
    return jwt.sign( {
                    id: user._id,
                    role:user.role
                    },
                    process.env.SECRET_KEY,
                    {expiresIn:"20m"})
}

const generateRefreshToken = ( user ) =>
{
    return jwt.sign({
                    id: user._id,
                    role:user.role
                    },
                    process.env.REFRESH_KEY,
                    { expiresIn: "365d" } )
}

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

            const user = await User.find( { mail: req.body.mail } )
            if ( user.length !== 0 )
            {
                return res.status(409).json({error:"email da ton tai", code:"DUPLICATE"})
            }
            const hashPassword = bcrypt.hashSync(req.body.password,10)
            const newUser = new User( {...req.body,password:hashPassword,role:"user"} )
            const newCart = new Cart({userId:newUser._id})
            Promise.all([newUser.save(), newCart.save()])
            .then( () =>
            {
                res.status(200).json(newUser)
            } )
                .catch( ( error ) =>
                {
                res.status(500).json(error)
                
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
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken( user )
                res.cookie("refreshToken", refreshToken,{httpOnly:true, sameSite:"strict"})
                const {password,...others} = user._doc
                return res.status(200).json({...others,accessToken})    
            }
            res.status(401).json("Password isn's match")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    refreshToke: ( req, res ) =>
    {
        const refreshToken = req.cookies.refreshToken
        if ( !refreshToken )
        {
            res.status(401).json("You're not authenticated")
        }
        jwt.verify( refreshToken, process.env.REFRESH_KEY, ( err, user ) =>
        {
            if ( err )
            {
                console.log(err)
            }
            const newAccessToken = generateAccessToken( user )
            const newRefreshToken = generateRefreshToken( user )
            res.cookie("refreshToken", newRefreshToken,{httpOnly:true, sameSite:"strict"})
            res.status(200).json({"accessToken":newAccessToken})
        })
    }
    ,
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