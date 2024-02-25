import mongoose from 'mongoose';

const depreciated = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    asset: Object,
    userId: String,
    damagedTime: String,
    thoughts: String,
    createdAt: String,
})

const Depreciated = mongoose.model("Depreciated", depreciated);
export default Depreciated;
