import e from 'express'
import { getAllUser, postOneUser, refreshToken, userLogin } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.get('', getAllUser)

userRouter.post('', postOneUser)

userRouter.post('/login', userLogin)

userRouter.post('/refresh-token', refreshToken)

export default userRouter