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
                timeCreate: moment().format('hh:mm:ss'),
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
    }

    return (
        <>
            <div className="head">
                <div className="head-navigation">
                    <span>AppStarter</span>
                    <ul>
                        <li>Features</li>
                        <li>Video Tour</li>
                        <li>Reviews</li>
                        <li>Pricing</li>
                        <li><button>GET IT FREE</button></li>
                    </ul>
                </div>
                <div className="head__content">
                    <div className="head__content__text">
                        <div className="logo"></div>
                        <p><span>AppStarter.</span> Best landing page for web and mobile apps </p>
                        <div>
                            <button className="head__content-download">Download Now</button>
                            <button className="head__content-watch">Watch Video</button>
                        </div>
                    </div>
                    <div className="head-tablet"></div>
                </div>
            </div>
            <div className="page">
                <div className="page-text">
                    <span className="page-text__first"><span className="page-text__why">Why</span> do we use it?</span>
                    <p>This sounded nonsense to Alice, so she said nothing,
                    but set off at once toward the Red Queen. To her surprise, she lost sight of her in a moment.
                    </p>
                </div>
                <div className="conteiner">
                    <div className="conteiner-spaceCreate">
                        <input type="text" className="nameTask" placeholder="Timer Name" />
                        <button onClick={create}>Create Timer</button>
                    </div>
                    {task.flat().map((i, index) => {
                        return <div key={index} className="task">
                            <span className="conteiner__name">{i.name === "" ? `Timer name ${index + 1}` : i.name}</span>
                            <Timer time={i.timeCreate} name={`name${index}`} index={index} />
                            <button className="delete" onClick={() => deleteTask(index, task)}><i className="fas fa-trash basket"></i></button>
                        </div>
                    })}
                </div>
            </div>
            <footer>
                <span>AppStarter</span>
                <div className="author">
                    <div>
                        <span className="author__created">Created with by <i className="fas fa-heart heart"></i></span><span className="author__name">Sergey Azovskiy</span>
                    </div>
                    <span className="author__AppStarter">© AppStarter, 2017</span>
                </div>
                <div className="links">
                    <i class="fab fa-twitter twitter"></i>
                    <div class="links__middle">
                        <i class="fab fa-facebook-f facebook"></i>
                    </div>
                    <i class="fab fa-instagram instagram"></i>
                </div>
            </footer>
        </>
    )
};

export default App;