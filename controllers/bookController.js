const Book = require( "../schemas/bookSchema")
const Generes = require("../schemas/generesSchema")

const bookController = {
    addABook: async ( req, res ) =>
    {
        try {
            const newBook = new Book( req.body )
            await newBook.save()
            res.status(200).json(newBook)            
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getABook: async ( req, res ) =>
    {
        try {
            const book =await Book.findById( req.params.bookId )
            if ( !book )
            {
                return res.status( 401 ).json( "No Book Found" )
            }
            res.status(200).json(book)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAllBook:async( req, res ) =>
    {
        try
        {
            const page = req.query.page || 1
            const limit = req.query.limit || 15
            const fields = req.query.fields || ''
            let filte = {}
            if ( req.query.search_query )
            {
                filte = {...filte,  $text: { $search: req.query.search_query }}   
            }
            
            // if ( req.query.generes )
            // {
            //     filte = {...filte,generes: { $or: req.query.generes.split( " " ) }}    
            // }
            // if ( req.query.authors )
            // {
            //     filte = {...filte,authors: { $or: req.query.authors.split( " " ) }}   
            // }
            
            const orConditions = [];

            if (req.query.generes) {
                const genresArray = req.query.generes.split(" ");
                orConditions.push({ generes: { $in: genresArray } });
            }

            if ( req.query.saled == 'true' )
            {
                orConditions.push({sale:{$gt:0}})
            }

            if (req.query.authors) {
                const authorsArray = req.query.authors.split(" ");
                orConditions.push({ authors: { $in: authorsArray } });
            }

            if (orConditions.length > 0) {
                filte = { ...filte, $or: orConditions };
            }
            const books =await Book.find( filte ,fields).skip( ( page - 1 ) * limit ).limit( limit )
            const total = await Book.countDocuments( filte )
            Promise.all( [ books, total ] ).then( (results) =>
            {
                res.status(200).json({total:results[1],books:results[0]})
            } )
                .catch( error =>
                {
                
            res.status(500).json(error)
            })
        } catch ( error )
        {
            res.status(500).json(error)
        }
    },
    changeInfo: async ( req, res ) =>
    {
        try {
            const book = await Book.findByIdAndUpdate( req.params.bookId, req.body, { new: true } )
            if ( !book )
            {
                return res.status(401).json("No Book Found")
            }
            res.status(200).json(book)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteABook: async ( req, res ) =>
    {
        try {
            const book = await Book.findByIdAndDelete( req.params.bookId )
            if ( !book )
            {
                return res.status(401).json("No Book Found")
            }
            res.status(200).json(book)
        } catch (error) {
            res.status(500).json(error)
        }
    },
}


module.exports = bookController