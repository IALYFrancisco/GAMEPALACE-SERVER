import e from 'express'
import { getAllUser, postOneUser, userLogin } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.get('', getAllUser)

userRouter.post('', postOneUser)

userRouter.post('/login', userLogin)

export default userRouter