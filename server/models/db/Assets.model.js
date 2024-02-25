import mongoose from 'mongoose';

const assetsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    sn: String,
    usage: String,
    status: String,
    createdAt: String,
})

const Assets = mongoose.model("Assets", assetsSchema);
export default Assets;
