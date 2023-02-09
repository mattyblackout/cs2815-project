import React, {useState, useEffect} from 'react';
import '../css/Waiter.css';
import logo from '../logo.png';
import splash from '../splash-image.jpg';


function Waiter() {
    const [orders, setOrders] = useState([])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="the logo" className="header-image"/>
            </header>
            <div className="ordersContainer">
                <button className="activeButton"> Active</button>
                <button className="completedButton"> Completed</button>
                <hr className="underline"></hr>
                <div className="orderContainer">
                    <div> Order #1 <br/>
                        Table: 7
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Waiter