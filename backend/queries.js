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

/**
 * Uses the specified item type to return the rows of menu items where they belong to that type only.
 * Example: if the category is "drinks" then only drinks items are returned
 * @param {URL} request is the URL specified under the GET request containing the item type
 * @param {JSON} response contains the complete rows of menu items containing that type
 * @throws SQL error
 */
const getMenuByType = (request, response) => {
    const category = request.params.category

    pool.query('SELECT * FROM menu WHERE category=$1 and available = true', [category], (error, results) => {
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

/**
 * Gets order information for each item in an order that has not yet been confirmed. 
 * Order information, for each item in every order, contains the overall order information as well as the information for each individual item under that order.
 * @param {URL} request is the URL specified by the POST request containing the order id
 * @param {JSON} response Contains the rows of order items that have not been confirmed
 * @throws SQL error
 */
const getWaitOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Gets order information for each item in an order that has not yet been confirmed, and orders them by the time ordered. 
 * Order information, for each item in every order, contains the overall order information as well as the information for each individual item under that order.
 * @param {URL} request is the URL specified by the POST request containing the order id
 * @param {JSON} response Contains the rows of order items that have not been confirmed, ordered by the time they were ordered
 * @throws SQL error
 */
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

/**
 * Deletes a specific order depending on its order number and confirms the deletion as a response.
 * @param {URL} req the URL included in the POST request that contains the order number to delete
 * @param {JSON} res contains a confirmation message stating which order (by order number) has been deleted
 * @throws the SQL error if it cannot be deleted
 */
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

/**
 * Marks a specific order as delivered depending on the order id provided.
 * @param {URL} req the URL included in the POST request that contains the order id to use
 * @param {JSON} res contains the confirmation message to state an order was marked as delivered
 * @throws the SQL error if it can not be marked as delivered
 */
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

/**
 * Gets the overall order information and order item information for orders that have been confirmed but have not been completed.
 * @param {URL} request the URL used in the GET request
 * @param {JSON} response contains the data for all the rows of orders
 * @throws SQL error
 */
const getKitchenOrders = (request, response) => {
    pool.query("SELECT orders.order_number, orders.time_ordered, menu.name, order_items.item_quantity, menu.price FROM orders JOIN order_items ON orders.order_number = order_items.order_number JOIN menu ON order_items.item_id = menu.id WHERE orders.confirmed = true AND orders.complete = false;", (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

/**
 * Sets the orders specified by an order id to complete.
 * @param {URL} req the URL used by the POST request that contains the order id
 * @param {JSON} res contains the confirmation message to state if an order was marked as completed
 * @throws SQL error if it could not be marke as completed
 */
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

const requestHelp = (request, response) => {
    const tableNumber = request.body
    pool.query('INSERT INTO assistance (tableNumber) VALUES ($1)',
        [tableNumber],
        (error, result) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Help requested: ${result.insertId}`)
        })
}

/**
 * Retrieves the calories and string concatenation of ingredients for a single specified menu item by its id.
 * @param {URL} request the URL used by the GET request containing the menu item id.
 * @param {JSON} response contains the rows of data containing the calorie and ingredient information.
 * @throws SQL error
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
    getItemCaloriesAndIngredients,
    requestHelp
}