import React, {useState, useEffect} from 'react';
import '../css/Menu.css';
import logo from '../logo.png';
import '../fonts/Bayon-Regular.ttf';
import splash from '../splash-image.jpg';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

let show = true;

function infoPopup() {
    alert("I am an alert box!");
}

function Menu() {
    const [expanded, setExpanded] = useState("");
    const [tableNumber, setTableNumber] = useState("");
    const [mains, setMains] = useState([]);
    const [sides, setSides] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [order, setOrder] = useState([]);
    const [counter, setCounter] = useState(0);

    const addToOrder = (item) => {
        const existingItemIndex = order.findIndex(orderItem => orderItem.name === item.name);
        if (existingItemIndex !== -1) {
            const updatedOrder = [...order];
            updatedOrder[existingItemIndex].quantity += 1;
            setOrder(updatedOrder);
        } else {
            setOrder([...order, {...item, quantity: 1}]);
        }
    };
    const handleCheckout = () => {
        if (order.length === 0) {
            alert('Your basket is empty');
        } else {
            setOrder([]);
            setCounter(counter + 1);
            alert('Your items are added to cart!');
        }
    };


    const handleRemove = (itemToRemove) => {
        const existingItemIndex = order.findIndex((item) => item.name === itemToRemove.name);
        if (existingItemIndex >= 0) {
            const updatedOrder = [...order];
            if (updatedOrder[existingItemIndex].quantity > 1) {
                updatedOrder[existingItemIndex].quantity -= 1;
            } else {
                updatedOrder.splice(existingItemIndex, 1);
            }
            setOrder(updatedOrder);
        }
    };

    const totalMoney = order.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

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
        if (item === 'drinks') {
            fetch('http://localhost:3000/menu/31')
                .then((response) => response.json())
                .then((data) => {
                    setDrinks(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (item === 'desserts') {
            fetch('http://localhost:3000/menu/41')
                .then((response) => response.json())
                .then((data) => {
                    setDesserts(data);
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
                <Link to="/">
                    <img src={logo} alt="the logo" className="header-image"/>
                </Link>
                <div>
                    <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link>
                    <Link to="/cart">
                        <button className="cart-button">Cart</button>
                    </Link>
                </div>
            </header>
            <div className="splash-image">
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
                    <div className="ordering-container">
                        <h1 className="table">TABLE</h1>
                        <p className="table-number">{tableNumber}</p>
                        <hr className="underline"></hr>
                        <h1 className="simple-text">YOUR ORDER</h1>
                        <h4 className={"GAP"}/>
                        {order.map((item, index) => (
                                <div className= "order-row">
                                    <div key={index}>
                                        <div className="item-name">{item.quantity} {item.name}</div>
                                        <button className="remove" onClick={() => handleRemove(item)}>-</button>
                                        <div className="money">£{(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                                ))}
                        <hr className="underline"></hr>
                        <h1 className="simple-text">TOTAL</h1>
                        <h2 className="money">£{totalMoney.toFixed(2)}</h2>
                        <button className="checkout" onClick={handleCheckout}>CHECKOUT</button>
                    </div>
                </div>
            </div>
            <div className="separate"/>
            {expanded === "mains" && (
                <div className='expanded-div'>
                    <div className='menu-items-container'>
                        {mains.map((item) => (
                            <>
                                <div className='food-item-container'>
                                    <div><p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p></div>
                                    <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                        <button class="information" className='information' onClick={() => infoPopup()}> ⓘ</button>
                                        <br/></div>
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
                                <div><p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p></div>
                                <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                    <button class="information" className='information' onClick={() => infoPopup()}> ⓘ</button>
                                    <br/></div>
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
                                <div><p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p></div>
                                <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                    <button class="information" className='information' onClick={() => infoPopup()}> ⓘ</button>
                                    <br/></div>
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
                                    <div><p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p></div>
                                    <div className='menu-items' key={item.id}>{item.name} - £{item.price}&nbsp;&nbsp;&nbsp;
                                        <button class="information" className='information' onClick={() => infoPopup()}> ⓘ</button>
                                        <br/></div>
                                    <div className='description' key={item.id}>{item.description} <br/></div>
                                    <button className='add-button' onClick={() => addToOrder(item)}> Add To Order</button>
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

export default Menu;


