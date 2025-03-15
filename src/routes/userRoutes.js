import e from 'express'
import { getAllUser, logout, postOneUser, refreshToken, userLogin } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.get('', getAllUser)

userRouter.post('', postOneUser)

userRouter.post('/login', userLogin)

userRouter.post('/refresh-token', refreshToken)

userRouter.post('/logout', logout)

export default userRouter