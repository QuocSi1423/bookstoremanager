const express = require( "express" )
const mongoose = require( "mongoose" )
const morgan = require( "morgan" )
const dotenv = require( "dotenv" )
const bodyParser = require("body-parser")
const cors = require("cors")

const userRoute = require("./routes/userRoute")
const bookRoute = require("./routes/bookRoute")
const expOrderRoute = require( "./routes/exportOrderRoute" )
const generesRoute = require("./routes/generesRoute")
dotenv.config()
const app = express()
const connectDB = async() => {
    try
    {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}
connectDB()
app.use( bodyParser.json() )
app.use( cors() )
app.use( morgan( "common" ) )

app.use( "/v1/users", userRoute )
app.use( "/v1/books", bookRoute )
app.use( "/v1/exp-orders", expOrderRoute )
app.use("/v1/generes",generesRoute)


app.listen( process.env.PORT || 8000, () =>
{
    console.log("server is running")
})