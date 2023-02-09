import React, {useState} from 'react';
import '../Waiter.css';
import logo from '../logo.png';


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
        setExpanded(item)
    }
    const handleOrderClick = () => {
        console.log("You clicked an order!")
    }

    return (<div className="App">
        <header className="App-header">
            <img src={logo} alt="the logo" className="header-image"/>
        </header>
        <div className="ordersContainer">
            <button className="activeButton" onClick={() => handleButtonClick("Active")}> Active</button>
            <button className="completedButton"> Completed</button>
            <hr className="underline"/>
            {[...new Set(orders.map(order => order.order_number))].map(id => {
                const order_time = ordersWithId(id)[0].time_ordered;
                return (<div className="orderContainer">
                    <div className="order-left"> Order #{id} <br/>
                        Table: 7
                    </div>
                    <div className="order-right">

                        <div className="order-right"> {order_time} <br/>
                            4 Minute(s) ago
                        </div>

                    </div>
                </div>)
            })}


            <div className="orderContainer">
                <div className="order-left"> Order #1 <br/>
                    Table: 7
                </div>
                <div className="order-right"> 15:24 <br/>
                    4 Minute(s) ago
                </div>
            </div>
        </div>
    </div>)
}

export default Waiter