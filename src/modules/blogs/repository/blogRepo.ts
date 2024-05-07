import BlogModel from "../../../database/models/blogs";


export const createBlog = async(body:any)=>{
    return await BlogModel.create(body);
}

export const getAllBlog = async()=>{
    return await BlogModel.find();
}

export const getBlogById = async(id:string)=>{
    return await BlogModel.findOne({_id:id});
}

export const updateBlog = async(id:string)=>{
    return await BlogModel.findByIdAndUpdate({_id:id});
}

export const deleteBlog = async(id:string)=>{
    return await BlogModel.findByIdAndDelete({_id:id});
}