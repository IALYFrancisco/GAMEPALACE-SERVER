import e from 'express'
import { getAllUser, postOneUser } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.get('', getAllUser)

userRouter.post('', postOneUser)

export default userRouter