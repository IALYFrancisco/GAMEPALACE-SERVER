import e from 'express'
import dotenv from 'dotenv'
import userRouter from './src/routes/userRoutes.js'

dotenv.config()


const app = e()

app.use(e.json())

app.get('/', (request, response) => {
    response.status(200).json("Ready to start")
})

app.use('/user', userRouter)

app.listen(3000)
