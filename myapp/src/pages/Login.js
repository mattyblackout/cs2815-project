import React, {useState, useEffect} from 'react';
import '../css/Login.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import splash from '../splash-image.jpg';

function Login() {
    const [orders, setOrders] = useState([])
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} alt="the logo" className="header-image"/>
        </header>
        </div>
        )
    }
    
    export default Login