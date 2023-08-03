const mongoose = require( "mongoose" )

const generesSchema = new mongoose.Schema( {
    name: String
} )
 
module.exports = mongoose.model("Generes",generesSchema)