import mongoose from "mongoose";


export interface ICategory extends Document{
    _id:string;
    name:string;
    storeId:string;
    createdAt:Date;
    updateAt:Date;
}
const CategorySchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;