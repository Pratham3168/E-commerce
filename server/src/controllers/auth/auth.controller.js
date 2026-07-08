import * as authService from '../../services/auth/auth.service.js';

export const registerUser = async (req,res,next) => {
    try{

        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success:true,
            message: "User Registered Successfully",
            data: user
        });
    }
    catch(err){
        next(err)
    }
};