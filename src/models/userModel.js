import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    birthdate: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true}
})

const userCollection = mongoose.Model('Users', userSchema)

export default userCollection