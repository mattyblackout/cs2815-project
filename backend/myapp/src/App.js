import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import './fonts/Bayon-Regular.ttf';
import splash from './splash-image.jpg';

function App() {
    const [expanded, setExpanded] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [showPrompt, setShowPrompt] = useState(true);
    const [mains, setMains] = useState([]);


    const handleButtonClick = (item) => {
        if (item === 'mains') {
            fetch('http://localhost:3000/menu/11')
          .then((response) => response.json())
          .then((data) => {
              setMains(data);
          })
          .catch((error) => {
              console.log(error);
          });
        }

        setExpanded(item);
    };

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
                        {mains.map((item) => (
                                <li key={item.id}>{item.name} - ${item.calories/20}</li>
                                ))}
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


