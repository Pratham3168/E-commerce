import * as authService from '../../services/auth/auth.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

export const registerUser = asyncHandler( async (req,res) => {
    const user = await authService.registerUser(req.body);

    return res.status(201).json(
        new ApiResponse(201,user,"User registered successfully")
    );
});