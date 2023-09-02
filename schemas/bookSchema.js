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
        type: [mongoose.Schema.ObjectId],
        default:[]
    },
    price: {
        type: Number,
        required:true
    },
    pages: {
        type: Number,
        default:0
    },
    generes: {
        type: [ mongoose.Schema.ObjectId ],
        ref:"Generes",
        default: [],
    },
    urlImage: {
        type:String
    },
    sale: {
        type: Number,
        default: 0
    },
    publisher: {
        type: String,
        default:''
    },
    distributor: {
        type: String,
        default:''
    },
    publicationDate: {
        type: String,
        default:''
    },
    description: {
        type: [String],
        default:[]
    }
})

const Book = mongoose.model("Book", bookSchema)
module.exports = Book