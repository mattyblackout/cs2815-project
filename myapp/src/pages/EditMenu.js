import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import logo from "../logo.png";
import splash from "../splash-image.jpg";
import {wait} from "@testing-library/user-event/dist/utils";

function EditMenu() {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/menu')
            .then((response) => response.json())
            .then((data) => {
                setMenu(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleButtonClick(available, item) {
        fetch(`http://localhost:3000/update/${item.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                available: available
            }),
        }).then((response) => response.json())
            .then((updatedItem) => {
                const updatedMenu = menu.map((menuitem) => {
                    if (menuitem.id === updatedItem.id) {
                        return updatedItem;
                    } else {
                        return menuitem;
                    }
                });
                setMenu(updatedMenu);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (<div className="App">
        <header className="App-header">
            <Link to="/waiter">
                <img src={logo} alt="the logo" className="header-image"/>
            </Link>
        </header>
        <div className="splash-image">
            <img src={splash} alt="splash" className={"splash-image"}/>
        </div>
        <h2 className="Heading">Edit Menu</h2>
        <div className="menu-container">
            <div className="menu-item">
                {menu.map((item) => (
                    <div className='menu-items' key={item.id}>
                        <span className="menu-name">{item.name}</span>
                        {item.available === true ? (
                            <button className='hideButton' onClick={ () => handleButtonClick(false,item)}>Hide</button>
                        ) : (
                            <button className='showButton' onClick={ () => handleButtonClick(true,item)}>Show</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>);
}

export default EditMenu;

