import e from 'express'
import { Logout, postOneUser, refreshToken, Login } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.post('', postOneUser)

userRouter.post('/login', Login)

userRouter.post('/refresh-token', refreshToken)

userRouter.post('/logout', Logout)

export default userRouter