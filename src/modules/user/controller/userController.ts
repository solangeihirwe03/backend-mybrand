import express from 'express';
import { createUser, deleteUser, getAllUser, getUserByEmail, getUserById } from '../repository/userRepo';
import { encryptPassword, comparePassword} from '../../../helpers/passwordHelpers';
import { generateToken } from '../../../helpers/index';

export const signUp  = async(req:express.Request, res:express.Response)=>{
    try{
        const{username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(403).json({
                status: false,
                message: "please insert your information"
            });
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json({
                status: false,
                message: "user already exist"
            });
        }

        const hashedpassword = await encryptPassword(password);
        const user = await createUser({
            username: username,
            email: email,
            password: hashedpassword,
        });
        return res.status(200).json({
            status: true,
            data: user
        });
    }
    catch(error: any){
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
                status: false,
                message: "you are not allowed"
            });
        }

        const isPasswordMatch = await comparePassword(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                status: false,
                message:'wrongPassword'
            });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            status: true,
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
                status: false,
                message: "users are not found",
            })
        }
        return res.status(200).json({
            status: true,
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
                status: false,
                message:"user not found"
            });
        }
        const deletedUser = await deleteUser(userId);
        return res.status(200).json({
            status: true,
            data: deletedUser
        });

    }catch(error:any){
        return res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
}