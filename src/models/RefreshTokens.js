import mongoose from 'mongoose'

const refreshTokensSchema = mongoose.Schema({
    token: { type: String, required: true }
})

const RefreshTokens = new mongoose.model('RefreshTokens', refreshTokensSchema)

export default RefreshTokens