import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import './fonts/Bayon-Regular.ttf';
import splash from './splash-image.jpg';

let show = true;

function App() {
    const [expanded, setExpanded] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [mains, setMains] = useState([]);
    const [sides, setSides] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinks, setDrinks] = useState([]);
    let order = [];
    let index = 0;

    const addToOrder = (item) => {
        order.push({
            index: index, 
            name: item.name, 
            price: item.price});
        index++;
        console.log(order);
    }


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
    if (item === 'sides') {
        fetch('http://localhost:3000/menu/23')
            .then((response) => response.json())
            .then((data) => {
                setSides(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (item === 'desserts') {
        fetch('http://localhost:3000/menu/30')
            .then((response) => response.json())
            .then((data) => {
                setDesserts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (item === 'mains') {
        fetch('http://localhost:3000/menu/35')
            .then((response) => response.json())
            .then((data) => {
                setDrinks(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    setExpanded(item);
};

useEffect(() => {
    if (show) {
        setTableNumber(window.prompt('What is your table number?'));
        show = false; //Stops the prompt from loading multiple times
    }
}, []);
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
            <div className='order-items-container'>
                    {order.map((order) => (
                        <>
                            <div className='menu-items' key={order.index}>{order.name} - {order.price} </div>
                        </>
                    ))}
                </div>
        </div>
        <div className="menu-container">

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
                <div className='menu-items-container'>
                    {mains.map((item) => (
                        <>
                            <div className='food-item-container'>
                                <div className='menu-items' key={item.id}>{item.name} - ${item.calories / 20} </div>
                                <div className='description' key={item.id}>{item.description} <br /></div>
                                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        )}
        {expanded === "sides" && (
            <div className='expanded-div'>
                <div className='menu-items-container'>
                    {sides.map((item) => (
                        <>
                            <text className='menu-items' key={item.id}>{item.name} - ${item.calories / 20} </text>
                            <text className='description' key={item.id}>{item.description} <br /></text>
                        </>
                    ))}
                </div>
            </div>
        )}
        {expanded === "desserts" && (
            <div className='expanded-div'>
                <div className='menu-items-container'>
                    {desserts.map((item) => (
                        <>
                            <text className='menu-items' key={item.id}>{item.name} - ${item.calories / 20} </text>
                            <text className='description' key={item.id}>{item.description}<br /></text>
                        </>
                    ))}
                </div>
            </div>
        )
        }
        {
            expanded === "drinks" && (
                <div className='expanded-div'>
                    <div className='menu-items-container'>
                        {drinks.map((item) => (
                            <>
                                <text className='menu-items' key={item.id}>{item.name} - ${item.calories / 20} </text>
                                <text className='description' key={item.id}>{item.description} <br /></text>
                            </>
                        ))}
                    </div>
                </div>
            )
        }
    </div>
)
    ;
}

export default App;


