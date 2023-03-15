// Code adapted from https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/#creating-routes-crud-operations

const {request, response} = require("express");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'aekkmejk',
    host: 'trumpet.db.elephantsql.com',
    database: 'aekkmejk',
    password: 't0tYetmAy50WtSeI_zAQBcyI_Fmkt6AE',
    port: 5432,
})

const getMenu = (request, response) => {
    pool.query('SELECT * FROM menu ORDER BY id asc', (error, results) => {
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


    pool.query('SELECT * FROM menu WHERE id < $1 and id >= $2 and available = true', [id, range], (error, results) => {
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
        'UPDATE menu SET available = $1 WHERE id = $2',
        [available, id],
        (error) => {
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

const getWaitOrdersFiltered = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = false ORDER BY time_ordered;", (error, results) => {
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
        (error) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as confirmed`)
        }
    )
}

const deleteOrders =  (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'DELETE FROM orders WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} deleted`)
        }
    )
}

const deliverOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET delivered = true WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as delivered`)
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
        'UPDATE orders SET complete = TRUE WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as completed`)
        }
    )
}

const getFinishedOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.complete = true and orders.delivered = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getFinishedOrdersFiltered = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.complete = true and orders.delivered = false ORDER BY time_ordered;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUnpaidOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.delivered = true and orders.paid = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUnpaidOrdersFiltered = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.delivered = true and orders.paid = false ORDER BY time_ordered;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
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

const payOrders = (req, res) => {
    const order_number = parseInt(req.params.id)
    pool.query(
        'UPDATE orders SET paid = true WHERE order_number = $1',
        [order_number],
        (error) => {
            if (error){
                throw error
            }
            res.status(200).send(`Order number ${order_number} marked as paid`)
        }
    )
}

/*
Retrieves the calories and string concatenation of ingredients for a single specified menu item by its id
*/
const getItemCaloriesAndIngredients = (request, response) => {
    const id = parseInt(request.params.id) //Menu.id
    pool.query(
        "SELECT Menu.calories, string_agg(DISTINCT ItemContains.ingredient, ', ') as AllIngredients " +
        "FROM Menu, ItemContains "+
        "WHERE Menu.id = $1 AND ItemContains.item_id = $1 " +
        "GROUP BY Menu.id",
        [id],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(200).json(result.rows)
        }
    )
}

module.exports = {
    getMenu,
    updateMenu,
    getMenuByType,
    createUser,
    authenticate,
    getWaitOrders,
    getKitchenOrders,
    updateWaitOrders,
    updateKitchenOrders,
    getFinishedOrders,
    deleteOrders,
    deliverOrders,
    getUnpaidOrders,
    payOrders,
    getFinishedOrdersFiltered,
    getUnpaidOrdersFiltered,
    getWaitOrdersFiltered,
    getItemCaloriesAndIngredients
}