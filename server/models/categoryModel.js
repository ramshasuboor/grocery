import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        required: true,
    },
    category_image:{
        type: String,
    },
    description:{
        type:String,
    }
})

export const Category = mongoose.model("Category",categorySchema) 