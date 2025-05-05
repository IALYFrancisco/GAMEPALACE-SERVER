import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    birthdate: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    register_date: { type: Date, required: true, default: Date.now }
})

const userCollection = new mongoose.model('Users', userSchema)

export default userCollection