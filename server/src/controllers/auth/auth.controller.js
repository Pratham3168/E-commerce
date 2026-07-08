import * as authService from '../../services/auth/auth.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

export const registerUser = asyncHandler( async (req,res) => {
    const user = await authService.registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(201,user,"User registered successfully")
    );
});


export const loginUser = asyncHandler( async (req,res) => {
    const user = await authService.loginUser(req.body);

    return res.status(200).json(
        new ApiResponse(200,user,"User logged in successfully")
    );
});