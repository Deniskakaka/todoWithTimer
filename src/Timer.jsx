import React, { useState, useEffect } from "react";
import moment from "moment";
require('moment-precise-range-plugin');

function Timer({ time, name }) {

  let passed = moment.utc(moment.duration(moment().format('hh:mm:ss')) - moment.duration(time)).format("DD HH:mm:ss");
  
  const [second, setSecond] = useState(+passed.slice(-2));
  const [minuts, setMinuts] = useState(+passed.slice(-5, -3));
  const [hours, setHours] = useState(+passed.slice(3, 5));
  const [timeInterval, setTimeInterval] = useState(0);
  const [on, setOn] = useState(true);
  let timer = moment().hour(hours).minute(minuts).second(second).format('HH : mm : ss');

  useEffect(() => {
    setTimeInterval(setInterval(() => {
      setSecond(second => second + 1)
    }, 1000));

    window.addEventListener("load", () => {
      setSecond(+passed.slice(-2));
      setMinuts(+passed.slice(-5, -3))
      setHours(+passed.slice(3, 5))
    })
    return () => {clearInterval(timeInterval)} 
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