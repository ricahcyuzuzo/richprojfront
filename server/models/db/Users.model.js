import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: String,
    updatedAt: String,
})

const User = mongoose.model('users', usersSchema);

export default User;

