const mongoose = require( "mongoose" )

const bookSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,

    },
    searchName: {
        type:String
    }
    ,
    quantity: {
        type: Number,
        default:0
    },
    authors: {
        type: [String],
        default:[]
    },
    price: {
        type: Number,
        required:true
    },
    pages: {
        type: Number,
    },
    generes: {
        type: [ mongoose.Schema.ObjectId ],
        ref:"Generes",
        default:[]
    },
    urlImage: {
        type:String
    }
})

const Book = mongoose.model("Book", bookSchema)
module.exports = Book