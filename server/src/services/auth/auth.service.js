import User from '../../models/user.model.js';
import ApiError from '../../errors/apiError.js';

//IMPLEMENTATION OF REGISTER USER FUNCTION
export const registerUser = async (userData) => {
    const { firstName, lastName, email, password,phone } = userData;  

    if(!firstName || !lastName || !email || !password || !phone){
        throw new ApiError(400, "All fields are required");
    }

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