/* eslint-disable no-unused-vars */
const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
    const CPUcores = os.cpus().length
  
    // Fork workers for each CPU core
    for (let i = 0; i < CPUcores; i++) {
        cluster.fork()
    }
}   
else
{
    const express = require('express')
    const errorHandler = require('./middleware/errorHandler')
    const dotenv = require('dotenv').config()
    const connectDb = require('./config/dbConnection')
    const app = express() //created app instance
    connectDb()
    app.use(express.json())
    app.use('/api/users', require('./routes/userRoutes'))
    app.use('/api/products', require('./routes/productRoutes'))
    app.use('/api/category', require('./routes/categoryRoutes'))
    app.use('/api/orders', require('./routes/orderRoutes'))
    app.use('/api/cart', require('./routes/cartRoutes'))
    app.use(process.env.API_AUTH_URL, require('./routes/authRoutes'))
    app.use(errorHandler)

    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log(`Server started on port http://localhost:${port}`)
    }) 
} 


