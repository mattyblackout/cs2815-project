import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import './fonts/Bayon-Regular.ttf';
import splash from './splash-image.jpg';

function App() {
    const [expanded, setExpanded] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [showPrompt, setShowPrompt] = useState(true);

    const handleButtonClick = (item) => {
        setExpanded(item);
    }

    useEffect(() => {
        if (showPrompt) {
            setTableNumber(window.prompt('What is your table number?'));
            setShowPrompt(false);
        }
    }, [showPrompt]);
  return (

    <div className="App">

      <header className="App-header">
        <img src={logo} alt="the logo" className="header-image" />
      </header>
      <div className="splash-div">
        <img src={splash} alt="splash" className={"splash-image"} />
      </div>
        <div className="order-container">
            <p> Table {tableNumber}</p>
        </div>
      <div className="menu-container">
        <div className="separate" />

        <div className="menu-categories-container">
            <div className="menu-category-container">
                <button onClick={() => handleButtonClick("mains")}>Mains</button>
            </div>
            <div className="menu-category-container">
                <button onClick={() => handleButtonClick("sides")}>Sides</button>
            </div>
            <div className="menu-category-container">
                <button onClick={() => handleButtonClick("desserts")}>Desserts</button>
            </div>
            <div className="menu-category-container">
                <button onClick={() => handleButtonClick("drinks")}>Drinks</button>
            </div>
        </div>
      </div>
        <div className="separate">
        </div>
        {expanded === "mains" && (
                <div className='expanded-div'>
                    <ul>
                        <li>Taco al Pastor - $5.99</li>
                        <li>Mole Poblano - $12.99</li>
                        <li>Tamales Oaxaquenos - $8.99</li>
                        <li>Enchiladas de Mole - $10.99</li>
                    </ul>
                </div>
                )}
        {expanded === "sides" && (
                <div className='expanded-div'>
                    <ul>
                        <li>Refried Beans - $2.99</li>
                        <li>Rice - $2.99</li>
                        <li>Guacamole - $4.99</li>
                    </ul>
                </div>
                )}
        {expanded === "desserts" && (
                <div className='expanded-div'>
                    <ul>
                        <li>Churros con Chocolate - $6.99</li>
                        <li>Flan - $5.99</li>
                    </ul>
                </div>
                )}
        {expanded === "drinks" && (
                <div className='expanded-div'>
                    <ul>
                        <li>Horchata - $2.99</li>
                        <li>Agua Fresca - $2.99</li>
                        <li>Margarita - $7.99</li>
                    </ul>
                </div>
                )}
    </div>
    );
}

export default App;


