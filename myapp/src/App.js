import React, {useState} from 'react';
import './App.css';
import logo from './logo.png';
import './fonts/Bayon-Regular.ttf'
import splash from './splash-image.jpg'

function App() {
    const [mainOpen, setMainOpen] = useState(false);
    const [sidesOpen, setSidesOpen] = useState(false);
    const [dessertsOpen, setDessertsOpen] = useState(false);
    const [drinksOpen, setDrinksOpen] = useState(false);

    const handleMainClick = () => {
        setMainOpen(!mainOpen);
        setSidesOpen(false);
        setDessertsOpen(false);
        setDrinksOpen(false);
    }

    const handleSidesClick = () => {
        setMainOpen(false);
        setSidesOpen(!sidesOpen);
        setDessertsOpen(false);
        setDrinksOpen(false);
    }

    const handleDessertsClick = () => {
        setMainOpen(false);
        setSidesOpen(false);
        setDessertsOpen(!dessertsOpen);
        setDrinksOpen(false);
    }

    const handleDrinksClick = () => {
        setMainOpen(false);
        setSidesOpen(false);
        setDessertsOpen(false);
        setDrinksOpen(!drinksOpen);
    }

    return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} alt="the logo" className="header-image"/>
                </header>
                <div className="splash-div">
                    <img src={splash} alt="splash" className={"splash-image"}/>
                    </div>

                <div className="menu-container">
                    <h2> </h2>
                    <div className="menu-categories-container">
                        <div className="menu-category-container">
                            <button onClick={handleMainClick}>Mains</button>
                            {mainOpen && (
                                    <ul>
                                        <li>Taco al Pastor - $5.99</li>
                                        <li>Mole Poblano - $12.99</li>
                                        <li>Tamales Oaxaqueños - $8.99</li>
                                        <li>Enchiladas de Mole - $10.99</li>
                                    </ul>
                                    )}
                        </div>
                        <div className="menu-category-container">
                            <button onClick={handleSidesClick}>Sides</button>
                            {sidesOpen && (
                                    <ul>
                                        <li>Refried Beans - $2.99</li>
                                        <li>Rice - $2.99</li>
                                        <li>Guacamole - $4.99</li>
                                    </ul>
                                    )}
                        </div>
                        <div className="menu-category-container">
                            <button onClick={handleDessertsClick}>Desserts</button>
                            {dessertsOpen && (
                                    <ul>
                                        <li>Churros con Chocolate - $6.99</li>
                                        <li>Flan - $5.99</li>
                                    </ul>
                                    )}
                        </div>
                        <div className="menu-category-container">
                            <button onClick={handleDrinksClick}>Drinks</button>
                            {drinksOpen && (
                                    <ul>
                                        <li>Horchata - $2.99</li>
                                        <li>Agua Fresca - $2.99</li>
                                        <li>Margarita - $7.99</li>
                                    </ul>
                                    )}
                        </div>
                    </div>
                </div>
            </div>
            );
}
export default App;


