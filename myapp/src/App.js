import {Route, Routes} from "react-router-dom"
import { default as Menu } from './pages/Menu.js';
import { default as Orders} from './pages/Orders';


export function App() {
    return (
            <Routes>
                <Route path = "/" element = {<Menu />} />
                <Route path = "orders" element={<Orders />} />
            </Routes>
    )
}