import mongoose from 'mongoose'

const gameSchema = mongoose.Schema({
    name: {type: String, required: true},
    poster_file_url: {type:String, required: true},
    category: {type:String, required: true}
})

const gameCollection = new mongoose.model('Games', gameSchema)

export default gameCollection