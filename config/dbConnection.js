const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING
        //     , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // }
        )
        console.log('MongoDB Connected\n Host:',connect.connection.host,"\n Database:",
        connect.connection.name)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDb