import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User
