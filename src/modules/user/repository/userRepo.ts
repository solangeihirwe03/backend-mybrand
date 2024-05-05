import UserModel from "../../../database/models/user"


export const createUser = async(body:any)=>{
    return await UserModel.create(body);
}

export const getAllUser = async()=>{
    return await UserModel.find();
}

export const getUserById = async(id:string)=>{
    return await UserModel.findOne({_id: id});
}

export const getUserByEmail = async(email:string)=>{
    return await UserModel.findOne({email});
}

export const updateUser = async(id: string)=>{
    return await UserModel.findByIdAndUpdate({_id:id});
}

export const deleteUser = async(id:string)=>{
    return await UserModel.findByIdAndDelete({_id:id});
}