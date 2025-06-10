import mongoose from 'mongoose'

const refreshTokensSchema = mongoose.Schema({
    user_id: { type: String, required: true},
    token: { type: String, required: true },
    generation_date: { type: Date, required: true, default: Date.now }
})

const RefreshTokens = new mongoose.model('RefreshTokens', refreshTokensSchema)

export default RefreshTokens