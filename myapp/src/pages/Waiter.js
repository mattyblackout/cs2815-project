import React, {useState} from 'react';
import '../css/Waiter.css';
import logo from '../logo.png';
import {Link} from 'react-router-dom';

function Waiter() {
    const [orders, setOrders] = useState([])

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
    }


    const handleOrderClick = () => {
        console.log("You clicked an order!")
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
                    <div className="orderContainer" onClick={() => console.log('Clicked order ' + {id})}>
                        <div className="order-left" onClick={() => console.log('Clicked order ' + {id})}> Order #{id} <br/>
                            Table: 7
                        </div>
                        <div className="order-right" onClick={() => console.log('Clicked order ' + {id})}>

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
            <div className='confirm-order'> Confirm Order</div>
            <div className='delete-order'> Delete Order</div>
        </div>

    </div>)
}
export default Waiter