import React, { useState } from 'react';
import '../css/Waiter.css';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

function Waiter() {
    const [orders, setOrders] = useState([]);
    const [expanded, setExpanded] = useState('');

    function ordersWithId(id) {
        return orders.filter((order) => order.order_number === id);
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
        } else if (item === 'Help-Required') {
            fetch('http://localhost:3000/assistanceTable')
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
        } else if (item === 'Help-Required') {
            fetch('http://localhost:3000/assistanceTable')
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
        console.log('Clicked order ' + id);
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
                <button className = "helpButton" onClick = {() => handleButtonClick("Help-Required")}>
                    Help Required
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
                <h1 className="simple-text">YOUR ORDER</h1>
                <h4 className={"GAP"} />
                <hr className="underline"></hr>
                <h1 className="simple-text">TOTAL</h1>
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
                {expanded === "Help-Required" && (
                    <>
                        <div
                            className="mark-as-done"
                            //onClick={() => }
                        >
                            Mark as Done
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default Waiter;