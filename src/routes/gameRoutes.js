import e from 'express'
import { listOfGames } from '../services/gameServices.js'

const gameRouter = e.Router()

gameRouter.get('', listOfGames)

export default gameRouter