import e from 'express'
import { getAllUser } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.get('', getAllUser)

export default userRouter