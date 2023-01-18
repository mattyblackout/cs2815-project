import React, { useState } from 'react';
import './App.css';

function App() {
  const [mainOpen, setMainOpen] = useState(false);
  const [sidesOpen, setSidesOpen] = useState(false);
  const [dessertsOpen, setDessertsOpen] = useState(false);
  const [drinksOpen, setDrinksOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Oaxaca Restaurant</h1>
      </header>
      <div className="menu-container">
        <h2>Menu</h2>
        <button onClick={() => setMainOpen(!mainOpen)}>Main Dishes</button>
        {mainOpen && (
          <ul>
            <li>Taco al Pastor - $5.99</li>
            <li>Mole Poblano - $12.99</li>
            <li>Tamales Oaxaqueños - $8.99</li>
            <li>Enchiladas de Mole - $10.99</li>
          </ul>
        )}
        <button onClick={() => setSidesOpen(!sidesOpen)}>Sides</button>
        {sidesOpen && (
          <ul>
            <li>Refried Beans - $2.99</li>
            <li>Rice - $2.99</li>
            <li>Guacamole - $4.99</li>
          </ul>
        )}
        <button onClick={() => setDessertsOpen(!dessertsOpen)}>Desserts</button>
        {dessertsOpen && (
          <ul>
            <li>Churros con Chocolate - $6.99</li>
            <li>Flan - $5.99</li>
          </ul>
        )}
        <button onClick={() => setDrinksOpen(!drinksOpen)}>Drinks</button>
        {drinksOpen && (
          <ul>
            <li>Horchata - $2.99</li>
            <li>Agua Fresca - $2.99</li>
            <li>Margarita - $7.99</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
