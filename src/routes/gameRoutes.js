import e from 'express'
import { addOneGame, listOfGames } from '../services/gameServices.js'

const gameRouter = e.Router()

gameRouter.get('', listOfGames)

gameRouter.post('', addOneGame)

export default gameRouter