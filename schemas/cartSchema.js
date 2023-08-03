const mongoose = require( "mongoose" )

const cartSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    books: {
        type: [ 
            {
                bookId: {
                    type:mongoose.Schema.ObjectId
                },
                quantity: {
                    type: Number,
                    default:1
                }
            }
        ],
        default:[]
    }
} )

const Cart = mongoose.model( "Cart", cartSchema )
module.exports = Cart