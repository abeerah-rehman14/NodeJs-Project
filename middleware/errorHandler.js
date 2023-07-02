const {constants} = require("../constants");


const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode || 500
    switch (statusCode) { 
        case constants.VALIDATION_ERROR:
            res.status(400).json({status: 400, message: error.message})
            break
        case constants.UNAUTHENTICATED:
            res.status(401).json({status: 401, message: error.message})
            break
        case constants.FORBIDDEN:
            res.status(403).json({status: 403, message: error.message})
            break        
        case constants.NOT_FOUND:
            res.status(404).json({status: 404, message: error.message})
            break 
        case constants.INTERNAL_SERVER_ERROR:  
            res.status(500).json({status: 500, message: error.message})  
            
        default:    
            break
      }






    //res.json({title: "Error", message: error.message, stackTrace: error.stack})
}

module.exports = errorHandler