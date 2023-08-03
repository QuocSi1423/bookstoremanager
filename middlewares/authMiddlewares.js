const jwt = require( "jsonwebtoken" )

const authMiddlewares = {
    verifyToken: ( req, res, next ) =>
    {
        const token = req.headers.token
        if ( token )
        {
            const accessToken = token.split( " " )[ 1 ]
            jwt.verify( accessToken, process.env.SECRET_KEY, ( error, user ) =>
            {
                if ( error )
                {
                    return res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        } else
        {
            res.status(401).json("You're not authenticated")
        }
    },
    verifyIdentityAndAdmin: ( req, res, next ) =>
    {
        authMiddlewares.verifyToken( req, res, () =>
        {
            if ( req.user.role == "admin" || req.user.id == req.params.userId)
            {
                next()
            } else
            {
                res.status(403).json("You're not allowed")
                
            }
        })
    },
    verifyIdentity: ( req, res, next ) =>
    {
        authMiddlewares.verifyToken( req, res, () =>
        {
            if ( req.user.id == req.params.userId)
            {
                next()
            } else
            {
                res.status(403).json("You're not allowed")
                
            }
        })
    }
    ,

    verifyAdmin: ( req, res, next ) =>
    {
        authMiddlewares.verifyToken( req, res, () =>
        {
            if ( req.user.role == "admin" )
            {
                next()
            } else
            {
                res.status(403).json("You're not allowed")
                
            }
        })
    }
}

module.exports = authMiddlewares