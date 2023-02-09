import React, { useState, useEffect } from 'react';
import '../css/Kitchen.css';
import logo from '../logo.png';
import splash from '../splash-image.jpg';
import { Link } from 'react-router-dom';

const Kitchen = (props) => {
  const [orders, setOrders] = useState([]);

  function ordersWithId(id) {
    return orders.filter(order => order.orderID === id);
  };

  const handleComplete = (orderID) => {
    if (window.confirm("Are you sure you have completed this order?")) {
      setOrders(orders.filter(order => order.orderID !== orderID));
      // You would also want to update the database here to mark the order as completed
    }
  }

  useEffect(() => {
    // Fetch the orders from the database here
    const fetchOrders = async () => {
      const response = await fetch('https://localhost:3000/food_orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <Link to="/">
              <img src={logo} alt="the logo" className="header-image"/>
          </Link>
      </header>
      <div className="splash-div">
        <img src={splash} alt="splash" className="splash-image" />
      </div>
      <h2 className="Heading">Food Orders</h2>
      <div className="order-container">
        { [...new Set(orders.map(order => order.orderID))].map(id => {
          const timeOrdered = ordersWithId(id)[0].timeOrdered;
          return (
            <div className="order-box" key={id}>
              <h3>Order #{id}</h3>
              <p className="time-order"> Time Ordered: {timeOrdered} </p>
              {ordersWithId(id).map(order => (
                <>
                  <p>Item: {order.itemName} x {order.itemQuantity}</p>
                </>
              ))}
              <button className="complete-button"onClick={() => handleComplete(id)}>Complete Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Kitchen;
