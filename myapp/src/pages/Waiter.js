import React, {useState} from 'react';
import '../css/Waiter.css';
import logo from '../logo.png';
import {Link} from 'react-router-dom';

function Waiter() {
    const [orders, setOrders] = useState([])
    const [expanded, setExpanded] = useState("")

    function ordersWithId(id) {
        return orders.filter(order => order.order_number === id);
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
        }
        if (item === 'Completed'){
            fetch('http://localhost:3000/finished-orders')
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setExpanded(item)
    }

    const handleConfirmOrder = (id) => {
        fetch(`http://localhost:3000/orders/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            }),
        }).then((response) => response.json())
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            }),
        }).then((response) => response.json())
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            }),
        }).then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.log(error);
            });
        alert(`Order number ${id} has been marked as delivered`)
    }

    let orderID
    function handleOrderClick(id){
        console.log('Clicked order ' + id)
        orderID = id
    }

    return (<div className="App">
        <header className="App-header">
            <Link to="/">
                <img src={logo} alt="the logo" className="header-image"/>
            </Link>
        </header>
        <div className="ordersContainer">
            <button className="activeButton" onClick={() => handleButtonClick("Active")}> Active</button>
            <button className="completedButton" onClick={() => handleButtonClick("Completed")}> Completed</button>
            <hr className="underline"/>
            {[...new Set(orders.map(order => order.order_number))].map(id => {
                const order_time = ordersWithId(id)[0].time_ordered;
                return (
                    <div className="orderContainer" onClick={() => handleOrderClick(id)}>
                        <div className="order-left" onClick={() => handleOrderClick(id)}> Order #{id} <br/>
                            Table: 7
                        </div>
                        <div className="order-right" onClick={() => handleOrderClick(id)}>

                            <div className="order-right"> {order_time} <br/>
                                4 Minute(s) ago
                            </div>
                        </div>
                        <br/>
                    </div>)
            })}
        </div>
        <div className="orderDisplay">
            <h1 className="table">TABLE</h1>
            <p className="table-number">7</p>
            <hr className="underline"></hr>
            <h1 className="simple-text">YOUR ORDER</h1>
            <h4 className={"GAP"}/>

            <hr className="underline"></hr>
            <h1 className="simple-text">TOTAL</h1>
            {expanded === "Active" && (
                <>
                    <div className='confirm-order' onClick={() => handleConfirmOrder(orderID)}> Confirm Order</div>
                    <div className='delete-order' onClick={() => handleDeleteOrder(orderID)}> Delete Order</div>
                </>
            )}
            {expanded === "Completed" && (
                <>
                    <div className='deliver-order' onClick={() => handleDeliverOrder(orderID)}> Delivered</div>
                </>
            )}

        </div>

    </div>)
}
export default Waiter