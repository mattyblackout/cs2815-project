// Code adapted from https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#creating-routes-crud-operations

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const cors = require('cors')
app.use(cors())


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/menu', db.getMenu)
app.get('/menu/:id', db.getMenuByType)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})