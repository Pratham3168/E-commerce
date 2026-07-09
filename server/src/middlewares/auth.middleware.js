import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../errors/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const protect  =  asyncHandler(async (req,res,next) => {

    //get token from cookies
    const accessToken = 
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ","");

    if(!accessToken){
        throw new ApiError(401,"Not authorized, no token");
    }
    
    let decoded;

    try {
        decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
    } catch {
        throw new ApiError(401, "Invalid or expired token");
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if(!user || !user.isActive){
        throw new ApiError(401,"User no longer has access");
    }

    req.user = user;

    next();

})

export default protect;