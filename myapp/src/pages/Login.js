import React, {useState, useEffect} from 'react';
import '../css/Login.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import { Link } from 'react-router-dom';

function Login() {
    const [orders, setOrders] = useState([])
    function login(username, password){

    }
    return (
        <div className="App">
        <header className="App-header">
            <Link to="/">
                <img src={logo} alt="the logo" className="header-image"/>
            </Link>
        </header>
            <div className="login-form">
                <Link to="../">
                <button className="login-Button"> LOGIN </button>
                </Link>
                <Link to="../">
                    <button className="register-button"> REGISTER </button>
                </Link>
                <Link to="../waiter">
                    <button className="waiter-button"> Waiter </button>
                </Link>
                <Link to="../kitchen">
                    <button className="kitchen-button"> Kitchen </button>
                </Link>
            </div>

        </div>
        )
    }
    
    export default Login