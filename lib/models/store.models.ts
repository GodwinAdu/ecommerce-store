import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
    userId: {
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


const Store = mongoose.models.Store || mongoose.model("Store", StoreSchema);

export default Store;