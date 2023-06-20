console.log("Starting")
const express = require("express");
const errorHandler = require('./middleware/errorHandler');
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")

const app = express(); //created app instance


connectDb();
//adding middleware
app.use(express.json()) //provides parser which will parse the data from the client request
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/auth", require("./routes/authRoutes"))

app.use(errorHandler)

const port = process.env.port || 3000;
app.listen(port)


