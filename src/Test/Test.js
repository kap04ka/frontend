import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Test.css';

import axios from "axios";

function Test(){
    const [questionsCount, setQstCount] = useState(1);
    const [questionsArray, setQuestions] = useState([]);
    const [currentQuestion, setQuestionIndex] = useState(0);
    const [result, setResult] = useState(0);
    const navigate = useNavigate()
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    function setQuestionsCount(e){
        if(e.target.value <= 0 || e.target.value > 15){
            alert('Incorrect data');
            return;
        }

        setQstCount(e.target.value);
    }

    function startTest(){
        const apiUrl = process.env.REACT_APP_API_URL + 'api/question' + `?questionCount=${questionsCount}`;
        console.log("TAHTS API URL", apiUrl);

        axios({
            method: 'post',
            url: apiUrl,
        }).then(response => {
            setQuestions(response.data);
        })

    }

    const getMark = (result) => {
        var mark = result / questionsCount;

        return Math.round(mark * 5.0);
    }

    const selectChoice = (index) => {

        if((index + 1) == questionsArray[currentQuestion].rightAnswer){
            setResult(result + 1);
        }

        if((currentQuestion + 1) < questionsCount)
            setQuestionIndex(currentQuestion + 1);

        else {
            alert(`Конец теста, вы ответили на: ${result} из ${questionsCount} вопросов\n Ваша оценка: ${getMark(result)}`);
            setQuestions([]);
            setQstCount(1);
            setQuestionIndex(0);
            setResult(0);
        }
        

    }

    return (
        <div>
            {questionsArray.length == 0 ? (
                <div>
                    <h1>Тест по вычислительной математике</h1>
                    <p>Введите количество вопросов <input type="number" value={questionsCount} defaultValue={1} onChange={setQuestionsCount}/></p>
                    <button onClick={startTest}>Начать тест</button>
                </div>
            ) : (
                    <div className="quiz">
                        <h5>Вопрос номер {currentQuestion + 1} из {questionsCount}</h5>
                        <h5>{questionsArray[currentQuestion].questionText}</h5>
                        <div>
                            {questionsArray[currentQuestion].answers.map((answer, index) => (
                                <button 
                                    key={index}
                                    className={`btn`}
                                    disabled={selectedAnswer !== null}
                                    onClick={() => selectChoice(index)}
                                >
                                {answer}
                                </button>
                            ))}
                        </div>
                        
                    </div>
                )}
        </div>
        
    )
}
export default Test;
