const express = require('express')
const { connect } = require('mongoose')

const app = express()
require('dotenv').config()
require('express-async-errors')
const errorMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

const connectDB = require('./db/connect')

const productRouter = require('./routes/products')


// middleware
app.use(express.json())


// routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Product route</a>')
})
app.use('/api/v1/products',productRouter )



// product route
app.use(errorMiddleware)
app.use(notFoundMiddleware)



// port
const port = process.env.PORT || 3000



const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}...`))
        
    } catch (error) {
        console.log(error)
        
    }
}
start()


