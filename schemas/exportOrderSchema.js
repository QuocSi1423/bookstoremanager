const mongoose = require( "mongoose" )

const exportOrderSchema = new mongoose.Schema( {
    userId: {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    status: {
        type: String,
        default:"handling"
    },
    detail: {
        type: mongoose.Schema.ObjectId,
        ref:"DetailExportOrder"
    },
} )

const ExportOrder = mongoose.model( "ExportOrder", exportOrderSchema )

module.exports = ExportOrder