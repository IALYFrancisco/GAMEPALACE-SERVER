import mongoose from 'mongoose'

const refreshTokensSchema = mongoose.Schema({
    token: { type: String, required: true }
})