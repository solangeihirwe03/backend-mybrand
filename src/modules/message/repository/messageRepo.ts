import { Messages } from "database/models/message";

const createMessages = async(body: any)=>{
    return await Messages.create(body);
}

const getAllMessages = async()=>{
    return await Messages.find()
}

const getMessageById = async(id: string)=>{
    return await Messages.findOne({_id: id});
}

const deleteMessageById = async(id: string)=>{
    return await Messages.deleteOne({_id: id});
}

export {createMessages, getAllMessages, getMessageById, deleteMessageById}