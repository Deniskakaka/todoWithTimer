import React, { useState, useEffect } from "react";
import Timer from "./Timer.jsx";
import moment from "moment";
require('moment-precise-range-plugin');
import "./main.scss";



function App() {
    const [task, setTask] = useState(JSON.parse(localStorage.getItem("tasks")) !== null ? JSON.parse(localStorage.getItem("tasks")) : [])
    let array = [];
    function create() {
        setTask(task.concat([
            {
                name: document.querySelector(".nameTask").value,
                timeCreate: moment().format('MMMM DD YYYY, hh:mm:ss '),
            }]),
        );
    }

    useEffect(() => {
        if (task.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(task))
        }
    }, [array]);


    function deleteTask(index, mass) {
        array = mass.filter((i, q) => { if (q !== index) { return i } })
        setTask(array)
        if (array.length < 1) {
            localStorage.removeItem("tasks")
        }
        console.log(array)
    }

    return (
        <div className="page">
            <div className="conteiner">
                <div className="conteiner-spaceCreate">
                    <input type="text" className="nameTask" placeholder="Timer Name" />
                    <button onClick={create}>Create Timer</button>
                </div>
                {task.flat().map((i, index) => {
                    return <div key={index} className="task">
                        <span className="conteiner__name">{i.name === "" ? `Timer name ${index + 1}` : i.name}</span>
                        <Timer time={i.timeCreate} name={`name${index}`} index={index}/>
                        <button className="delete" onClick={() => deleteTask(index, task)}><i className="fas fa-trash basket"></i></button>
                    </div>
                })}
            </div>
        </div>
    )
};

export default App;