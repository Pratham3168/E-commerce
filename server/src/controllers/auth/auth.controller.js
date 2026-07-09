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
    const {user, accessToken, refreshToken} = await authService.loginUser(req.body);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("accessToken" , accessToken, cookieOptions)
        .cookie("refreshToken" , refreshToken, cookieOptions)
        .json(
        new ApiResponse(200,
            {
                user,
                accessToken,
            },
            "User logged in successfully"
        )
    );
});


export const refreshAccessToken = asyncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    const {accessToken, refreshToken} = 
        await authService.refreshAccessToken(incomingRefreshToken);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
    };

    return res
        .status(200)
        .cookie("accessToken" , accessToken, cookieOptions)
        .cookie("refreshToken" , refreshToken, cookieOptions)
        .json(
        new ApiResponse(200,
            {
                accessToken,
            },
            "Access token refreshed successfully"
        )
    );
})


export const logoutUser = asyncHandler(async (req,res) => {
    await authService.logoutUser(req.user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
    };

    return res
        .clearCookie("accessToken",cookieOptions)
        .clearCookie("refreshToken",cookieOptions)
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Logged Out successfully"
            )
        )
});


export const changePassword = asyncHandler(async (req, res) => {
    await authService.changePassword(req.user._id,req.body.currentPassword, req.body.newPassword);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "strict",
    };


    return res
        .status(200)
        .clearCookie("accessToken",cookieOptions)
        .clearCookie("refreshToken",cookieOptions)
        .json(
            new ApiResponse(
                200,
                null,
                "Password changed successfully. Please login again"
            )
        )
})