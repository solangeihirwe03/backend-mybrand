import express from 'express';
import { createUser, deleteUser, getAllUser, getUserByEmail, getUserById } from '../repository/userRepo';
import { encryptPassword, comparePassword} from '../../../helpers/passwordHelpers';
import { generateToken } from '../../../helpers/index';

export const signUp  = async(req:express.Request, res:express.Response)=>{
    try{
        const{userName, email, password} = req.body;
        if(!userName || !email || !password){
            return res.status(400).json({
                status: 'fail',
                message: "please insert your information"
            });
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({
                status: 'fail',
                message: "user already exist"
            });
        }

        const hashedpassword = await encryptPassword(password);
        const user = await createUser({
            userName,
            email,
            password: hashedpassword,
        });
        return res.status(200).json({
            status:'success',
            data: user
        });
    }catch(error: any){
        res.status(500).json({
            message: "internal error server",
            error: error.message
        })
    }
}

export const login = async(req:express.Request, res:express.Response)=>{
    try{
        const{email, password}= req.body;
        const user = await getUserByEmail(email)
        if(!user){
            return res.status(400).json({
                status: "fail",
                message: "you are not allowed"
            });
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                status: "fail",
                message:'wrongPassword'
            });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            status:"success",
            data: {
                user,
                token
            }
        })
    }catch(error:any){
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const viewUsers = async(req: express.Request, res: express.Response)=>{
    try{
        const allUsers = await getAllUser()
        if(!allUsers || allUsers.length === 0){
            return res.status(400).json({
                message: "users are not found",
            })
        }
        return res.status(200).json({
            message: "All users are found",
            data: allUsers
        })
    }catch(error: any){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const deleteuser = async(req:express.Request, res:express.Response)=>{
    try{
        const userId = req.params.id;
        const existingUser  = await getUserById(userId);
        if(!existingUser){
            return res.status(400).json({
                message:"user not found"
            });
        }
        const deletedUser = await deleteUser(userId);
        return res.status(200).json({
            message:"User is deleted successfully",
            data: deletedUser
        });

    }catch(error:any){
        return res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}