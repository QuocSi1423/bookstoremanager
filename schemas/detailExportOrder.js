const mongoose = require( "mongoose" )


const detaiExportOrderSchema = new mongoose.Schema( {
    books: {
        type: [ {
            bookId: {
                type:mongoose.Schema.ObjectId
            },
            quantity: {
                type:Number
            },
            unitPrice: {
                type: Number
            }
        }],
        default:[]
    },
    address: {
        type:{
            provinceOrCity: {
                type: String,
                required:true
            },
            district: {
                type: String,
                required:true
            },
            ward: {
                type: String
            },
            detail: {
                type: String
            }
        },
        required:true
    },
    total: String,
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: "Order"
    }
} )


module.exports = mongoose.model("DetailExportOrder",detaiExportOrderSchema)