import React from "react";
import './Integral.css';
import ResList from "../ResList/ResList";
import Plot from 'react-plotly.js';
import { useState } from 'react';

import axios from "axios";

function Integral(){
    const [down, setLowerLimit] = useState(0.0);
    const [up, setUpperLimit] = useState(1.0);
    const [splits, setSplits] = useState(1000);
    const [resultList, setResList] = useState([]);
    const [x, setXArray] = useState([]);
    const [y, setYArray] = useState([]);
    const [underIntegralFunction, setFunc] = useState('x');

    function clearArea(){
        setResList([]);
        setLowerLimit(0.0);
        setUpperLimit(1.0);
        setSplits(1000);
        setFunc('x');
        setXArray([]);
        setYArray([]);
    }

    function deleteHandler(index){
        console.log(index);
        const results = [...resultList];
        results.splice(index, 1);
        setResList(results); 
    }

    function calculate(e){
        if(splits <= 0) {
            alert('Incorrect data');
            return;
        }

        const apiUrl = process.env.REACT_APP_API_URL + 'api/integral';
        console.log("TAHTS API URL", apiUrl);
        axios({
            method: 'post',
            url: apiUrl,
            data: {
                downLimit: down,
                upLimit: up,
                n: splits,
                funcIntegral: underIntegralFunction
            }
        }).then(response => {
            setXArray(response.data.x);
            setYArray(response.data.y);
            const newReslist = [...resultList].concat(response.data.result);
            setResList(newReslist);
        })
    }

    return(
        <div> 
            <Plot
                data={[
                {
                    x: x,
                    y: y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'red'},
                },
                ]}
                layout={{ width: 600, height: 400, title: 'Graph of ' + underIntegralFunction }}
            />

        <p>Вычисление интеграла ∫{underIntegralFunction}dx</p>
        <p>Верхний предел: <input type="number" value={up} defaultValue={1} onChange={e => setUpperLimit(e.target.value)}/></p>
        <p>Нижний предел: <input type="number" value={down} defaultValue={0} onChange={e => setLowerLimit(e.target.value)}/></p>
        <p>Число разбиений: <input type="number" value={splits} defaultValue={1000} onChange={e => setSplits(e.target.value)}/></p>
        <p>Подитнегральная функция: <input type="text" value={underIntegralFunction} defaultValue={'x'} onChange={e => setFunc(e.target.value)}/></p>
        <div className="container-buttons"> 
            <button onClick={calculate}>Рассчитать</button>
            <button onClick={clearArea}>Очистить все</button>
                
        </div>
            
        { 
            resultList.map((item, index) => { 
                let isActive = "off";
                if(index === resultList.length - 1){
                    isActive = "on";
                }
                return(
                    <ResList
                        divClass = {isActive}
                        key={index}
                        value={item}
                        onDelete={() => deleteHandler(index)}
                    />
                )

            })
        }

        </div>
    );
}

export default Integral;