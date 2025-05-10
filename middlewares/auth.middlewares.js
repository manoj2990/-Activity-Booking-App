
const jwt = require("jsonwebtoken");
const asyncHandler  = require("../utils/asyncHandler");
const { ApiError } = require("../utils/apiError");
require("dotenv").config();



exports.authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        
        const accessToken = req.cookies?.accessToken || 
                          req.header("Authorization")?.replace("Bearer ", "") || 
                          req.body.accessToken;
       
        if (!accessToken) {
            throw new ApiError(401, "Access token is missing");
        }

       
     
        try {
            const decodedToken = jwt.verify(accessToken,process.env.JWT_SECRET);
            req.user = decodedToken;
        } catch (error) {
            console.error("Access token verification failed:", error);
            throw new ApiError(401, "Invalid or expired access token");
        }
        

   
        next();
        
    } catch (error) {
        throw new ApiError(401, "Something went wrong while validating the token in auth");
    }
});


