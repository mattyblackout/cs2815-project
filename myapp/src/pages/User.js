import React, {useState, useEffect} from 'react';
import '../css/User.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import {Link} from 'react-router-dom';

function User() {
    return (
            <div className="User-Page">
                <header className="App-header">
                    <Link to="/menuL">
                        <img src={logo} alt="the logo" className="header-image"/>
                    </Link>
                </header>
        </div>
    )
}

export default User