import React, { useState } from 'react';
import '../css/Waiter.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Waiter() {
    const [orders, setOrders] = useState([]);
    const [expanded, setExpanded] = useState('');
    const [selected, setSelected] = useState([]);

    function ordersWithId(id) {
        return orders.filter((order) => order.order_number === id);
    }

    let total = 0;

    const updateTotal = (price) => {
        total = total + parseFloat(price);
    }

    const handleButtonClick = (item) => {
        if (item === 'Active') {
            fetch('http://localhost:3000/orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Completed') {
            fetch('http://localhost:3000/finished-orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Unpaid') {
            fetch('http://localhost:3000/unpaid-orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setExpanded(item);
    };

    const handleFilterClick = (item) => {
        if (item === 'Active') {
            fetch('http://localhost:3000/ordersFiltered')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Completed') {
            fetch('http://localhost:3000/finished-ordersFiltered')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (item === 'Unpaid') {
            fetch('http://localhost:3000/unpaid-ordersFiltered')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleConfirmOrder = (id) => {
        fetch(`http://localhost:3000/orders/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been confirmed`)
    }

    const handleDeleteOrder = (id) => {
        fetch(`http://localhost:3000/orders/delete/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been deleted`)
    }

    const handleDeliverOrder = (id) => {
        fetch(`http://localhost:3000/orders/delivered/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been marked as delivered`)
    }

    const handleMarkAsPaid = (id) => {
        fetch(`http://localhost:3000/orders/paid/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    let orderID;

    function handleOrderClick(id) {
        fetch(`http://localhost:3000/orders/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSelected(data);
            })
            .catch((error) => {
                console.log(error);
            });
        orderID = id;
    }

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/">
                    <img src={logo} alt="the logo" className="header-image" />
                </Link>
                <div>
                    <Link to="/edit">
                        <button className="edit-button">Edit Menu</button>
                    </Link>
                </div>
            </header>
            <div className="ordersContainer">
                <button className="activeButton" onClick={() => handleButtonClick("Active")}>
                    Active
                </button>
                <button className="completedButton" onClick={() => handleButtonClick("Completed")}>
                    Completed
                </button>
                <button className="paidButton" onClick={() => handleButtonClick("Unpaid")}>
                    Unpaid
                </button>
                <button className = "filterButton" onClick = {() => handleFilterClick(expanded)}>
                    Sort by time ordered
                </button>
                <hr className="underline" />
                {[...new Set(orders.map((order) => order.order_number))].map((id) => {
                    const order_time = ordersWithId(id)[0].time_ordered;
                    return (
                        <div
                            className="orderContainer"
                            onClick={() => handleOrderClick(id)}
                        >
                            <div
                                className="order-left"
                                onClick={() => handleOrderClick(id)}
                            >
                                Order #{id} <br />
                                Table: 7
                            </div>
                            <div className="order-right" onClick={() => handleOrderClick(id)}>
                                <div className="order-right">
                                    {order_time} <br />
                                    4 Minute(s) ago
                                </div>
                            </div>
                            <br />
                        </div>
                    );
                })}
            </div>
            <div className="orderDisplay">

                <h1 className="table">TABLE</h1>
                <p className="table-number">7</p>
                <hr className="underline"></hr>
                <div>
                    { [...new Set(selected.map(order => order.order_number))].map(id => {
                        return (
                            <div  key={id}>
                                <div className='order-id'>Order #{id}</div>
                                {ordersWithId(id).map(order => (
                                    <>
                                        <div className='order-items'>
                                            <div className='order-details'>Item: {order.name} <br/> Quantity: {order.item_quantity}</div>
                                            <div className='order-details'>Price: £{updateTotal((order.price  * order.item_quantity).toFixed(2))}{(order.price  * order.item_quantity).toFixed(2)}</div>
                                        </div>
                                    </>
                                ))}
                                <hr className="underline"></hr>
                                <h1 className="simple-text">TOTAL: £{total} </h1>
                            </div>
                        )
                    })}
                </div>
                {expanded === "Active" && (
                    <>
                        <div
                            className="confirm-order"
                            onClick={() => handleConfirmOrder(orderID)}
                        >
                            Confirm Order
                        </div>
                        <div
                            className="delete-order"
                            onClick={() => handleDeleteOrder(orderID)}
                        >
                            Delete Order
                        </div>
                    </>
                )}
                {expanded === "Completed" && (
                    <>
                        <div
                            className="deliver-order"
                            onClick={() => handleDeliverOrder(orderID)}
                        >
                            Delivered
                        </div>
                        <div
                            className="pay-order"
                            onClick={() => handleMarkAsPaid(orderID)}
                        >
                            Mark as Paid
                        </div>
                    </>
                )}
                {expanded === "Unpaid" && (
                    <>
                        <div
                            className="pay-order"
                            onClick={() => handleMarkAsPaid(orderID)}
                        >
                            Mark as Paid
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default Waiter;