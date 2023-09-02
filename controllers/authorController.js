const Author = require( "../schemas/authorSchema" )


const authorController = {
    getAuthor: async (req, res) =>
    {
        try {
            const authors = await Author.find()
            res.status(200).json(authors)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createAuthor: async ( req, res ) =>
    {
        try {
            const author = new Author( req.body )
            await author.save()
            res.status(200).json(author)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = authorController