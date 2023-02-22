import React, {useState, useEffect} from 'react';
import '../css/Register.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import {Link} from 'react-router-dom';

function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (event) => {
        const data = {email, password, status};

        // Send data to server to insert into database
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })

        // Clear form fields
        setEmail('');
        setPassword('');
        setStatus('');
        window.location.href = '/login';
    }

    return (
        <div className="Register">
            <header className="App-header">
                <Link to="/">
                    <img src={logo} alt="the logo" className="header-image"/>
                </Link>
            </header>
            <div className="form-group">
                <div className="label-wrapper">
                    <label className="email-label">Email:</label>
                </div>
                <div className="input-wrapper">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>

            <div className="form-group">
                <div className="label-wrapper">
                    <label className="password-label">Password:</label>
                </div>
                <div className="input-wrapper">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>

            <div className="form-group">
                <div className="label-wrapper">
                    <label className="status-label">Status:</label>
                </div>
                <div className="input-wrapper">
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}
                           placeholder="customers leave blank" defaultValue="customer"/>
                </div>
            </div>
            <div className="form-group">
                <button className="submit-button" onClick={handleSubmit}>
                    Register
                </button>
            </div>

        </div>
    )
}

export default Register