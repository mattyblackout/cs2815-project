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
    if (id === 11) {
        range = 0
    }
    if (id === 21) {
        range = 11
    }
    if (id === 31) {
        range = 21
    }
    if (id === 41) {
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
    const {available} = request.body

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
    const {items} = request.body

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
const createUser = (request, response) => {
    const {email, password, status_code} = request.body

    if (status_code === "KITCHEN") {
        pool.query('INSERT INTO users (email, password, status) VALUES ($1, $2, $3)',
            [email, password, "kitchen"],
            (error, result) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`User added: ${result.insertId}`)
            })
    } else if (status_code === "WAITER") {
        pool.query('INSERT INTO users (email, password, status) VALUES ($1, $2, $3)',
            [email, password, "waiter"],
            (error, result) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`User added: ${result.insertId}`)
            })
    } else {
        pool.query('INSERT INTO users (email, password, status) VALUES ($1, $2, $3)',
            [email, password, "customer"],
            (error, result) => {
                if (error) {
                    throw error
                }
                response.status(201).send(`User added: ${result.insertId}`)
            })
    }
}
const authenticate = (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while authenticating');
        } else if (result.rowCount === 0) {
            res.status(401).send('Incorrect email or password');
        } else {
            res.send('Login successful');
        }
    });
}


module.exports = {
    getMenu,
    updateMenu,
    getMenuByType,
    createOrder,
    createUser,
    authenticate
}