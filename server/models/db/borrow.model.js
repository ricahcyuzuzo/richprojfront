import mongoose from 'mongoose';

const acquisitionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    asset: Object,
    userId: String,
    borrowTime: String,
    returnTime: String,
    reason: String,
    status: String,
    createdAt: String,
})

const Acquisitions = mongoose.model("Acquisitions", acquisitionSchema);
export default Acquisitions;
