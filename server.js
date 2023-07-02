console.log('Starting')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const connectDb = require('./config/dbConnection')

const app = express() //created app instance

connectDb()
//adding middleware
app.use(express.json()) //provides parser which will parse the data from the client request
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/category', require('./routes/categoryRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/cart', require('./routes/cartRoutes'))



app.use(process.env.API_AUTH_URL, require('./routes/authRoutes'))

app.use(errorHandler)

const port = process.env.port || 3000
app.listen(port, ()=> {
    console.log(`Server started on port http://localhost:${port}`)
})
