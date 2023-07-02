const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) =>
{
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if(authHeader && authHeader.startsWith("Bearer "))
    {   
        const token = authHeader.split(" ")[1];
        if(!token)
        {
            res.status(401);
            throw new Error("missing token");
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error("invalid token");
            }
            
            req.user = decoded.user; // decode value embedded in token
            if(req.method != "GET" && req.baseUrl.includes("/api/products")){
                if(!req.user.isAdmin){
                    res.status(403);
                    throw new Error("Unauthorized access, Only admin can access");
                }

            }
            next();
        })
       
    }
    else{
        res.status(403);
        throw new Error("Unauthorized access, please login and try again");
    }

})


module.exports = validateToken;