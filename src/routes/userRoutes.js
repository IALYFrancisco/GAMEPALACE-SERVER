import e from 'express'
import { getAllUser, Logout, postOneUser, refreshToken, Login } from '../services/userServices.js'

const userRouter = e.Router()

userRouter.get('', getAllUser)

userRouter.post('', postOneUser)

userRouter.post('/login', Login)

userRouter.post('/refresh-token', refreshToken)

userRouter.post('/logout', Logout)

export default userRouter