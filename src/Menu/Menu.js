import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Info from "../Info/Info";
import Integral from "../Integral/Integral";
import Home from "../Home/Home";
import Test from "../Test/Test";
import './Menu.css';

function Nav(){
    return <nav>
        <NavLink to="/" className={({isActive}) => (isActive ? " active" : "")}>Главная</NavLink> &nbsp;&nbsp;
        <NavLink to="/info" className={({isActive}) => (isActive ? " active" : "")}>О методе</NavLink> &nbsp;&nbsp;
        <NavLink to="/integral" className={({isActive}) => (isActive ? " active" : "")}>Расчет интгерала</NavLink> &nbsp;&nbsp;
        <NavLink to="/test" className={({isActive}) => (isActive ? " active" : "")}>Тест</NavLink> &nbsp;&nbsp;

    </nav>;
}

function Menu(){
    return(
            
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/info" element={<Info />}/>
                <Route path="/integral" element={<Integral />}/>
                <Route path="/Test" element={<Test />}/>
            </Routes>
        </div>
        
    );
}
export default Menu;
