import React, { useState, useEffect } from 'react';
import '../css/Cart.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import { Link } from 'react-router-dom';

// main cart function, containing core code for the cart functionality
function Cart() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    // function to handle the input of the card number
    const handleCardNumberInput = (event) => {
        let formattedValue = event.target.value.replace(/ /g, '');
        if (formattedValue.length > 0) {
            formattedValue = formattedValue.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        setCardNumber(formattedValue);
    };

    // function to handle the input of the expiry date
    const handleExpiryInput = (event) => {
        let formattedValue = event.target.value.replace(/[^0-9]/g, '').substring(0, 4);
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
        }
        setExpiry(formattedValue);
    };

    // function to handle the input of the cvv
    const handleCvvInput = (event) => {
        let formattedValue = event.target.value.replace(/[^0-9]/g, '').substring(0, 3);
        setCvv(formattedValue);
    };

    // front-end code for cart
    return (
            <div className="Cart-Page">
                <header className="App-header">
                    <Link to="/">
                        <img src={logo} alt="the logo" className="header-image" />
                    </Link>
                </header>
                <div className="checkout-container">
                    <h2 className="title-text">ORDER SUMMARY</h2>
                    <hr className="underline"></hr>
                    <div className="checkout-order-container">
                        {fOrder.map((item, index) => (
                                <div className= "order-row">
                                    <div key={index}>
                                        <div className="item-name">{item}</div>
                                    </div>
                                </div>
                                ))}
                    </div>
                    <hr className="underline"></hr>
                    <h2 className="text">TABLE NUMBER:</h2>
                    <h2 className="text">ORDER TOTAL:</h2>
                </div>

                <div className="payment-container">
                    <h2 className="title-text">SELECT PAYMENT METHOD</h2>
                    <hr className="underline"></hr>
                    <div className="payment-type">
                        <button className="payment-button" onClick={() => console.log("Credit Card clicked")}>
                            CREDIT CARD
                        </button>
                        <button className="payment-button" onClick={() => console.log("PayPal clicked")}>
                            PAYPAL
                        </button>
                    </div>
                    <h2 className="text">NAME ON CARD</h2>
                    <div className="input-container">
                        <input type="name-on-card" />
                    </div>
                    <h2 className="text">CARD NUMBER</h2>
                    <div className="input-container">
                        <input type="card-number" placeholder="0000 • 0000 • 0000 • 0000" maxLength="19" value={cardNumber} onChange={handleCardNumberInput} />
                    </div>
                    <h2> </h2>
                    <div className="security-card">
                        <h2 className="text">EXPIRY DATE</h2>
                        <div className="small-input">
                            <input type="expiry-cvv" placeholder="00/00" maxLength="5" value={expiry} onChange={handleExpiryInput} />
                        </div>
                        <h2 className="text">CVV</h2>
                        <div className="small-input">
                            <input type="expiry-cvv" placeholder="123" maxLength="3" value={cvv} onChange={handleCvvInput} />
                        </div>
                    </div>
                </div>
                <div className="place-order">
                    <button className="place-order-button" onClick={() => console.log("Place order clicked")}>
                        PLACE ORDER
                    </button>
                </div>
            </div>
            )
}

export default Cart