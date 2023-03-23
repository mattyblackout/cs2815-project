import React, { useState, useEffect } from 'react';
import '../css/Cart.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import { Link } from 'react-router-dom';

function Cart() {

    const order = JSON.parse(localStorage.getItem("order"));
    var fOrder = [];
    var tPrice = 0;
    const tableNumber = JSON.parse(localStorage.getItem("tablenumber"))

    console.log(JSON.stringify(order[0].name));
    for (var i in order) {
        fOrder.push(JSON.stringify(order[i].name).replaceAll("\"", " ") + "£" + JSON.stringify(order[i].price).replaceAll("\"", ""));
        tPrice += parseFloat(order[i].price);
        console.log(fOrder);
    }

    const handleCheckout = (paid) => {
        const orders = {
            tableNumber: tableNumber,
            items: order,
            paid: paid
        };
        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orders)
        })
        .then(response => {
            if (response.ok) {
                alert('Order placed successfully!');
            } else {
                throw new Error('Error placing order');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Error placing order');
        });
    };


    return (
        <div className="User-Page">
            <header className="App-header">
                <Link to="/menu">
                    <img src={logo} alt="the logo" className="header-image" />
                </Link>
            </header>
            <div className="checkout-container">
                <h2 className="title-text">ORDER SUMMARY</h2>
                <hr className="underline"></hr>
                <div className="checkout-order-container">
                    {fOrder.map((item, index) => (
                        <div className="order-row">
                            <div key={index}>
                                <div className="item-name">
                                    <h1 className="text">{item}&nbsp;&nbsp;&nbsp;</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr className="underline"></hr>
                <h2 className="text">TABLE NUMBER: {JSON.stringify(tableNumber)}</h2>
            </div>
            <div className="orderTotal-container">
            <h2 className="text">ORDER TOTAL: {tPrice.toFixed(2)}</h2>
                <hr className="underline"></hr>
                <div className="place-order">
                    <button className="place-order-button" onClick={() =>handleCheckout('TRUE')}>
                        PAY NOW
                    </button>
                    <button className="place-order-button" onClick={() =>handleCheckout('FALSE')}>
                        PAY LATER
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;