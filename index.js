import e from 'express'
import dotenv from 'dotenv'
import userRouter from './src/routes/userRoutes.js'
import gameRouter from './src/routes/gameRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = e()

app.use(e.json())

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    response.setHeader('Access-Control-Allow-Method', '*')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.use(cookieParser())

app.get('/', (request, response) => {
    response.status(200).json("Welcome to GAMEPALACE server 👋🎮")
})

app.use('/user', userRouter)

app.use('/game', gameRouter)

app.listen(3000, () => {
    console.log(`The server is ready to work at: ${process.env.SERVER_HOST} ✨🎉`)
})
