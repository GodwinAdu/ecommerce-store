import mongoose, { Document } from "mongoose";

export interface IBillboadrd extends Document{
    _id:string;
    label:string;
    storeId:string;
    imageUrl:string;
    createdAt:Date;
    updateAt:Date;
}
const billboardSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});


const Billboard = mongoose.models.Billboard || mongoose.model("Billboard", billboardSchema);

export default Billboard;