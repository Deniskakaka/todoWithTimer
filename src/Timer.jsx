import React, { useState, useEffect } from "react";
import moment from "moment";
require('moment-precise-range-plugin');

let arr = [];

function Timer({ time, name }) {

  let diff = moment.preciseDiff(time, moment().format('MMMM DD YYYY, hh:mm:ss'));
  let passedSeconds = diff.match(/second/g) !== null
    ? +diff.match(/[0-9][0-9] second|[0-9] second/g)[0].slice(0, 2) : 0;
  let passedMinutes = diff.match(/minute/g) !== null
    ? +diff.match(/[0-9][0-9] minute|[0-9] minute/g)[0].slice(0, 2) : 0;
  let passedHours = diff.match(/hour/g) !== null
    ? +diff.match(/[0-9][0-9] hours|[0-9] hour/g)[0].slice(0, 2) : 0;

  const [second, setSecond] = useState(passedSeconds);
  const [minuts, setMinuts] = useState(passedMinutes);
  const [hours, setHours] = useState(passedHours);
  const [timeInterval, setTimeInterval] = useState(0);
  const [on, setOn] = useState(true);
  let timer = moment().hour(hours).minute(minuts).second(second).format('HH : mm : ss');

  useEffect(() => {
    setTimeInterval(setInterval(() => {
      setSecond(second => second + 1)
    }, 1000));

    localStorage.setItem("time", JSON.stringify(arr));

    window.addEventListener("unload", () => {
      arr.push(document.querySelector(`.${name}`).innerHTML)
      localStorage.setItem("time", JSON.stringify(arr))
    })
    window.addEventListener("load", () => {
      setSecond(passedSeconds);
      setMinuts(passedMinutes)
    })
  }, []);

  function stop() {
    clearInterval(timeInterval)
    setOn(false);
  }

  function start() {
    setTimeInterval(setInterval(() => {
      setSecond(second => second + 1)
    }, 1000))
    setOn(true);
  }

  return (
    <>
      <p className={!on ? `${name} red` : `${name}`}>{timer}</p>
      {on ? <button onClick={stop} className="pause"><i className="fas fa-pause off"></i></button> : ''}
      {on ? '' : <button onClick={start} className="play"><i className="fas fa-play on"></i></button>}
    </>
  )
};

export default Timer;