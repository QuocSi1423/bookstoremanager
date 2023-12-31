const mongoose = require( "mongoose" )

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
    },
    mail: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    cartId: mongoose.Schema.ObjectId
} )

const User = mongoose.model("User", userSchema)
module.exports = User