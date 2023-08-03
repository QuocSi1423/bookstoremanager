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
    getAllBook:( req, res ) =>
    {
        try
        {
            const page = req.query.page || 1
            const limit = req.query.limit || 15
            let filte = {}
            if ( req.query.search_query )
            {
                filte = {...filte,  $text: { $search: req.query.search_query }}   
            }
            if ( req.query.generes )
            {
                filte = {generes: { $in: req.query.generes.split( " " ) }}   
            }
            if ( req.query.author )
            {
                filte = {...filte,authors: { $in: req.query.author.split( " " ) }}   
            }
            
            const books = Book.find( filte ).skip( ( page - 1 ) * limit ).limit( limit )
            const total = Book.countDocuments( filte )
            Promise.all( [ books, total ] ).then( (results) =>
            {
                res.status(200).json({total:results[1],books:results[0]})
            })
        } catch ( error )
        {
            console.log(error)
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