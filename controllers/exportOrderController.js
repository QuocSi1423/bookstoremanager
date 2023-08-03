const ExportOrder = require( "../schemas/exportOrderSchema" )
const DetailExportOrder = require("../schemas/detailExportOrder")


const exportOrderController = {
    createAnOrder:async(req,res)=> {
        try
        {
            const {books,address,total,...others} = req.body
            const order = new ExportOrder( {...others, userId:req.params.userId})
            const detailOrder = new DetailExportOrder( { books: books, address: address, total: total, orderId: order._id } )
            order.detail = detailOrder._id;
            Promise.all( [ order.save(), detailOrder.save() ] )
            .then( () =>
            {
                res.status(200).json(order)
            })
        } catch (error) {
            res.status(500).jaon(error)
        }
    },
    getAnOrder:async(req,res)=> {
        try {
            const order = await ExportOrder.findById( req.params.orderId ).populate("detail")
            if ( !order )
            {
                return res.status(404).json("No Order Found")
            }
            if ( req.params.userId && !(req.params.userId == order.userId))
            {
                return res.status(403).json("You'r not allowed")
            }
            res.status(200).json(order)
        } catch (error) {
            res.status(500).jaon(error)
        }
    },
    getAllOrder:async(req,res)=> {
        try
        {
            const page = req.query.page || 1
            const limit = req.query.limit || 20

            const orders = await ExportOrder.find().skip((page-1)*limit).limit(limit)
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).jaon(error)
        }
    },
    getAllOrderOfAnUser:async(req,res)=> {
        try {
            const orders = await ExportOrder.find( { userId: req.params.userId } )
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).jaon(error)
        }
    },
    updateStatus:async(req,res)=> {
        try {
            const order = await ExportOrder.findByIdAndUpdate( req.params.orderId, { $set: { status: req.body.status } }, { new: true } )
            if ( !order )
            {
                return res.status(404).json("No Order Found")
            }
            res.status(200).json(order)
        } catch (error) {
            res.status(500).jaon(error)
        }
    },
}

module.exports = exportOrderController