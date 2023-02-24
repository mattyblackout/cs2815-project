// Code adapted from https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#creating-routes-crud-operations

const {request, response} = require("express");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'damanarora',
    host: 'localhost',
    database: 'damanarora',
    password: 'damanarora',
    port: 5433,
})

const getMenu = (request, response) => {
    pool.query('SELECT * FROM menu', (error, results) => {
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

const getWaitOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateWaitOrders =  (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET confirmed = TRUE WHERE order_number = $1',
        [order_number],
        (error, results) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as confirmed`)
        }
    )
}

const getKitchenOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = true AND orders.complete = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateKitchenOrders =  (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET completed = TRUE WHERE order_number = $1',
        [order_number],
        (error, results) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as completed`)
        }
    )
}

const getFinishedOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.completed = true;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
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
    const {email, password, status} = request.body
    pool.query('INSERT INTO users (email, password, status) VALUES ($1, $2, $3)',
        [email, password, status],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`User added: ${result.insertId}`)
        })
}
const authenticate = (req, res) => {
    const {email, password} = req.body;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while authenticating');
        } else if (result.rowCount === 0) {
            res.status(401).send('Incorrect email or password');
        } else {
            const user = result.rows[0];
            if (user.status === 'customer') {
                res.json({ message: 'customer' });
            } else if (user.status === 'waiter') {
                res.json({ message: 'waiter' });
            } else if (user.status === 'kitchen') {
                res.json({ message: 'kitchen' });
            }
        }
    });
}


const completeOrder = (request, response) => {
    const order_number = parseInt(request.params.order_number)
  
    pool.query(
      'UPDATE orders SET complete = TRUE WHERE order_number = $1',
      [order_number],
      (error, result) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Order ${order_number} marked as complete.`)
      }
    )
}

module.exports = {
    getMenu,
    updateMenu,
    getMenuByType,
    createOrder,
    createUser,
    authenticate,
    getWaitOrders,
    getKitchenOrders,
    updateWaitOrders,
    updateKitchenOrders,
    getFinishedOrders
    completeOrder
}