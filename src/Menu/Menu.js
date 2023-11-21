import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Info from "../Info/Info";
import Integral from "../Integral/Integral";
import Home from "../Home/Home";
import './Menu.css';

function Nav(){
    return <nav>
        <NavLink to="/" className={({isActive}) => (isActive ? " active" : "")}>Главная</NavLink> &nbsp;&nbsp;
        <NavLink to="/info" className={({isActive}) => (isActive ? " active" : "")}>О методе</NavLink> &nbsp;&nbsp;
        <NavLink to="/integral" className={({isActive}) => (isActive ? " active" : "")}>Расчет интгерала</NavLink> &nbsp;&nbsp;
        
    </nav>;
}

export default class Menu extends React.Component {

    render() {
        return(
            
            <div>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/info" element={<Info />}/>
                    <Route path="/integral" element={<Integral />}/>
                </Routes>
            </div>
            
        );
    }
}

