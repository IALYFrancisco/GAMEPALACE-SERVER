import e from 'express'

const app = e()

app.get('/', (request, response) => {
    response.status(200).json("Ready to start")
})

app.listen(3000)
