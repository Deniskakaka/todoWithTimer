import React, { useState, useEffect } from "react";
import moment from "moment";

function Timer({ time, name }) {

  var secs = moment.duration(moment(new Date()).diff(time)).asSeconds();
  
  const [second, setSecond] = useState(+secs);
  const [timeInterval, setTimeInterval] = useState(0);
  const [on, setOn] = useState(true);
  let timer = moment().hour(0).minute(0).second(second).format('HH : mm : ss');

  useEffect(() => {
    setTimeInterval(setInterval(() => {
      setSecond(second => second + 1)
    }, 1000));
   
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