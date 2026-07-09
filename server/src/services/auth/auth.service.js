import User from '../../models/user.model.js';
import ApiError from '../../errors/apiError.js';
import jwt from 'jsonwebtoken';


//HELPER FUNCTION TO GENERATE ACCESS TOKEN
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};


//helper function to generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
}

//IMPLEMENTATION OF REGISTER USER FUNCTION
export const registerUser = async (userData) => {
    const { firstName, lastName, email, password,phone } = userData;  

    //check if user already exists
    const existingUser = await User.findOne({
        $or : [{ email }, { phone }] });
    if(existingUser){
        throw new ApiError(409, "Email or phone already registered");;
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        phone
    });

    await newUser.save();

    const createdUser = await User.findById(newUser._id)
    .select("-password -refreshToken");
    return createdUser;
};


export const loginUser = async (userData) => {
    const {login,password} = userData;

    const query = login.includes("@")
        ? { email: login }
        : { phone: login };

    const user = await User.findOne(query);

    if(!user){
        throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const safeUser = await User.findById(user._id).select("-password -refreshToken");

    return { user: safeUser, accessToken, refreshToken };    
}