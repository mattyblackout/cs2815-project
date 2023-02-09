// Code adapted from https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#creating-routes-crud-operations

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'juan',
    password: 'postgres',
    port: 5432,
})

const getMenu = (request, response) => {
    pool.query('SELECT * FROM menu ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

let range
const getMenuByType = (request, response) => {
    const id = parseInt(request.params.id)
    if (id === 11){
        range = 0
    }
    if (id === 21){
        range = 11
    }
    if (id === 31){
        range = 21
    }
    if (id === 41){
        range = 31
    }


    pool.query('SELECT * FROM menu WHERE id < $1 and id >= $2', [id, range], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateMenu = (request, response) => {
    const id = parseInt(request.params.id)
    const { available } = request.body

    pool.query(
            'UPDATE menu SET available = $1, WHERE id = $2',
            [available, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(`User modified with ID: ${id}`)
            }
            )
}

const createOrder = (request, response) => {
    const { items } = request.body

    pool.query(
            'INSERT INTO orders (items) VALUES ($1)',
            [items],
            (error, result) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`Order added with ID: ${result.insertId}`)
            }
            )
}

module.exports = {
    getMenu,
    updateMenu,
    getMenuByType,
    createOrder
}