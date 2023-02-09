import React, { useState, useEffect } from 'react';
import '../css/Kitchen.css';
import logo from '../logo.png';
import splash from '../splash-image.jpg';


const Kitchen = (props) => {
  const [orders, setOrders] = useState([]);

  function ordersWithId(id) {
    return orders.filter(order => order.order_number === id);
  }

  const handleComplete = (order_number) => {
    if (window.confirm("Are you sure you have completed this order?")) {
      setOrders(orders.filter(orders => orders.order_number !== order_number));
      // You would also want to update the database here to mark the order as completed
    }
  }

  useEffect(() => {
    // Fetch the orders from the database here
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3000/kitchen-orders');
      const data = await response.json();
      setOrders(data);
      console.log(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="the logo" className="header-image" />
      </header>
      <div className="splash-div">
        <img src={splash} alt="splash" className="splash-image" />
      </div>
      <h2 className="Heading">Food Orders</h2>
      <div className="order-container">
        { [...new Set(orders.map(order => order.order_number))].map(id => {
          const time_ordered = ordersWithId(id)[0].time_ordered;
          return (
            <div className="order-box" key={id}>
              <div className='order-id'>Order #{id}</div>
              <div className="order-details"> Time Ordered: {time_ordered}</div>
              {ordersWithId(id).map(order => (
                <>
                  <div className='order-items'>
                    <div className='order-details'>Item: {order.name}</div>
                    <div className='order-details'>Quantity: {order.item_quantity}</div>
                  </div>
                </>
              ))}
              <div className='button-container'>
                <button className="complete-button" onClick={() => handleComplete(id)}>Complete Order</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Kitchen;
