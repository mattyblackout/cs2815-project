import React, {useState, useEffect} from 'react';
import '../Menu.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import splash from '../splash-image.jpg';

let show = true;

const Menu = () => {
    const [expanded, setExpanded] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [mains, setMains] = useState([]);
    const [sides, setSides] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [order, setOrder] = useState([]);

    const addToOrder = (item) => {
        setOrder([...order, item.name + "  " + item.price]);
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
            fetch('http://localhost:3000/menu/21')
                .then((response) => response.json())
                .then((data) => {
                    setSides(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (item === 'desserts') {
            fetch('http://localhost:3000/menu/31')
                .then((response) => response.json())
                .then((data) => {
                    setDesserts(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (item === 'drinks') {
            fetch('http://localhost:3000/menu/41')
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
                <img src={logo} alt="the logo" className="header-image"/>
            </header>
            <div className="splash-div">
                <img src={splash} alt="splash" className={"splash-image"}/>
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
                                    <div className='menu-items' key={item.id}>{item.name} - ${item.calories / 20}<br/>
                                    </div>
                                    <div className='description' key={item.id}>{item.description} <br/></div>
                                    <button className='add-button' onClick={() => addToOrder(item)}> Add To Order
                                    </button>
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
                                <div className='menu-items' key={item.id}>{item.name} - ${item.calories / 20}<br/></div>
                                <div className='description' key={item.id}>{item.description} <br/></div>
                                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
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
                                <div className='menu-items' key={item.id}>{item.name} - ${item.calories / 20}<br/></div>
                                <div className='description' key={item.id}>{item.description}<br/></div>
                                <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
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
                                    <div className='menu-items' key={item.id}>{item.name} - ${item.calories / 20}<br/></div>
                                    <div className='description' key={item.id}>{item.description} <br/></div>
                                    <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
                                </>
                            ))}
                        </div>
                    </div>
                )
            }
            <div className="order-container">
                <p> Table {tableNumber}</p>
                <div className='order-items-container'>
                    <ul>
                        {order.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>

    )
        ;
}

export default Menu;


