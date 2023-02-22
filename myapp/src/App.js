import {Route, Routes} from "react-router-dom"
import { default as Menu } from './pages/Menu.js';
import { default as Kitchen} from './pages/Kitchen';
import { default as Waiter} from './pages/Waiter';
import { default as Login} from './pages/Login';
import Register from "./pages/Register";


export function App() {
    return (
            <Routes>
                <Route path = "/" element = {<Menu />} />
                <Route path = "kitchen" element={<Kitchen />} />
                <Route path = "waiters" element = {<Waiter />} />
                <Route path = "login" element = {<Login />} />
                <Route path = "register" element = {<Register />} />
            </Routes>
    )
}