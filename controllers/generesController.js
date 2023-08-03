const Generes = require( "../schemas/generesSchema" )
const Book = require("../schemas/bookSchema")

const generesController = {
    addAGeneres: async ( req, res ) =>
    {
        try {
            const generes = new Generes( req.body ) 
            await generes.save()
            res.status(200).json(generes)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllgeneres: async ( req, res ) =>
    {
        try {
            const generes = await Generes.find()
            res.status(200).json(generes)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    changeAGeneres: async ( req, res ) =>
    {
        try {
            const generes = await Generes.findByIdAndUpdate( req.params.generesId, req.body, { new: true } )
            if ( !generes )
            {
                return res.status(404).json("No Generes Found")
            }
            res.status(200).json(generes)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteAGeneres: async ( req, res ) =>
    {
        try {
            const deleteGeneres = Generes.findByIdAndDelete( req.params.generesId )
            
            const updateBooks = Book.updateMany( { generes: req.params.generesId }, { $pull: { generes: req.params.generesId } } )
            Promise.all( [ deleteGeneres, updateBooks ] ).then( ( results ) =>
            {
                if ( !results[0] )
                {
                    return res.status(404).json("No Generes Found")
                }
                res.status(200).json(results[0])
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = generesController