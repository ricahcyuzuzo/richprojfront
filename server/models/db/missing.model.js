import mongoose from "mongoose";

const missingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    asset: Object,
    userId: String,
    missingTime: String,
    thoughts: String,
    createdAt: String,
})

const Missing = mongoose.model('Missing', missingSchema);

export default Missing;
