const User = require( "../schemas/userSchema" )
const Cart = require("../schemas/cartSchema")

const cartController = {
    addAnItem: async ( req, res ) =>
    {
        try {
            const cart = await Cart.findOneAndUpdate( { userId: req.params.userId }, { $push: { books: req.body }},{new:true} )
            res.status(200).json(cart)
        } catch (error) {
            res.status(200).json(error)
        }
    },
    getItems: async ( req, res ) =>
    {
        try {
            const cart = await Cart.findOne( { userId: req.params.userId } )
            res.status(200).json(cart)
        } catch (error) {
            res.status(200).json(error)
        }
    },
    changeQuantityOfAnItem: async ( req, res ) =>
    {
        try
        {
            if ( req.body.quantity == 0 )
            {
                const cart = await Cart.findOneAndUpdate( { userId: req.params.userId }, { $pull: {books:{ bookId: req.params.itemId }}},{new:true})
                return res.status(200).json(cart)
            }
            const cart = await Cart.findOneAndUpdate( { userId: req.params.userId }, { $set: { "books.$[elem].quantity": req.body.quantity } }, { arrayFilters: [{ "elem.bookId": req.params.itemId }], new: true } )
            res.status(200).json(cart)
        } catch (error) {
            res.status(200).json(error)
        }
    },
    clear: async ( req, res ) =>
    {
        try {
            const cart = await Cart.findOneAndUpdate( { userId: req.params.userId }, { books: [] }, { new: true } )
            res.status(200).json(cart)
        } catch (error) {
            res.status(200).json(error)
        }
    },
}

module.exports = cartController