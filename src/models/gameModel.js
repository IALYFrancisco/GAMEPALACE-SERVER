import mongoose from 'mongoose'

const gameSchema = mongoose.Schema({
    name: {type: String, required: true},
    poster_file_url: {type:String, required: true},
    category: {type:String, required: true},
    register_date: { type: Date, required: true, default: Date.now }
})

const gameCollection = new mongoose.model('Games', gameSchema)

export default gameCollection