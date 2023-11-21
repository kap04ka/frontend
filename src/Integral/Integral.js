import React from "react";
import './Integral.css';
import ResList from "../ResList/ResList";
import Plot from 'react-plotly.js';

import axios from "axios";


export default class Integral extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            up: 1,
            down: 0, 
            splits: 1000, 
            resultList: [], 
            x: [],
            y: [],
            underIntegralFunc: 'x'
        };

        this.calculate = this.calculate.bind(this);
        this.clearArea = this.clearArea.bind(this);
    }

    clearArea(){
        let array = [];
        this.setState({resultList: array})
    }

    deleteHandler(index){
        const results = this.state.resultList.concat();
        results.splice(index, 1);
        console.log(index);

        this.setState({resultList: results})
        console.log(this.state.resultList);

    }

    calculate(e){
        const apiUrl = process.env.REACT_APP_API_URL + 'api/integral';
        console.log("TAHTS API URL", apiUrl);
        axios({
            method: 'post',
            url: apiUrl,
            data: {
                downLimit: this.state.down,
                upLimit: this.state.up,
                n: this.state.splits,
                funcIntegral: this.state.underIntegralFunc
            }
        }).then(response => {
             this.setState({x: response.data.x});
             this.setState({y: response.data.y});
             this.setState({resultList: this.state.resultList.concat({value: response.data.result})});
        })
        
       
    }

    render() {


        return <div> 
            <Plot
                data={[
                {
                    x: this.state.x,
                    y: this.state.y,
                    type: 'scatter',
                    mode: 'lines',
                    marker: {color: 'red'},
                },
                ]}
                layout={{ width: 600, height: 400, title: 'Graph of ' + this.state.underIntegralFunc }}
            />
            <p>Вычисление интеграла ∫{this.state.underIntegralFunc}dx</p>
            <p>Верхний предел: <input type="number" value={this.up} defaultValue={1} onChange={e => this.setState({up: e.target.value})}/></p>
            <p>Нижний предел: <input type="number" value={this.down} defaultValue={0} onChange={e => this.setState({down: e.target.value})}/></p>
            <p>Число разбиений: <input type="number" value={this.splits} defaultValue={1000} onChange={e => this.setState({splits: e.target.value})}/></p>
            <p>Подитнегральная функция: <input type="text" value={this.underIntegralFunc} defaultValue={'x'} onChange={e => this.setState({underIntegralFunc: e.target.value})}/></p>
            <div className="container-buttons"> 
                <button onClick={this.calculate}>Рассчитать</button>
                <button onClick={this.clearArea}>Очистить все</button>
                
            </div>
            
            { 
                this.state.resultList.map((item, index) => { 
                    let isActive = "off";
                    if(index === this.state.resultList.length - 1){
                        isActive = "on";
                    }
                    return(
                    <ResList
                        divClass = {isActive}
                        key={index}
                        value={item.value}
                        onDelete={this.deleteHandler.bind(this, index)}
                    />
                    )

                })
            }

        </div>
    }
}