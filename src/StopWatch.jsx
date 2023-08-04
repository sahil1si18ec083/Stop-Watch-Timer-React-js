import { useEffect, useState, useRef } from "react";
const StopWatch = () => {
  const [timerObject, setTimerObject] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [startFlag, setStartFlag] = useState(false);
  const ref = useRef(null);
  const fnButtonStart = () => {
    setStartFlag(true);
  };
  const fnButtonStop = () => {
    setStartFlag(false);
    clearInterval(ref.current);
  };
  const fnButtonReset = () => {
    setStartFlag(false);
    setTimerObject({ hours: 0, minutes: 0, seconds: 0 });
    clearInterval(ref.current);
  };
  useEffect(() => {
    const timer =
      startFlag &&
      setInterval(() => {
        if (timerObject.seconds < 59) {
          setTimerObject({
            ...timerObject,
            seconds: timerObject.seconds + 1
          });
        } else if (timerObject.seconds === 59) {
          setTimerObject({
            ...timerObject,
            minutes: timerObject.minutes + 1,
            seconds: 0
          });
        } else if (timerObject.minutes < 59) {
          setTimerObject({
            ...timerObject,
            seconds: timerObject.minutes + 1
          });
        } else if (timerObject.minutes === 59) {
          setTimerObject({
            ...timerObject,
            hours: timerObject.hours + 1,
            minutes: 0
          });
        }
      }, 1000);
    ref.current = timer;

    return () => {
      console.log("cleanup function is called");
      clearInterval(timer);
    };
  }, [startFlag, timerObject]);
  return (
    <>
      <div className="app-container">
        <div className="stop-watch-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="stopwatch-card">
            <div className="stopwatch-card-header">
              <img
                className="clock-image"
                alt="mini-clock"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              />
              <p className="timer-heading">Timer</p>
            </div>
            <h1 className="time-display" testid="timer">
              {timerObject.hours <= 9
                ? "0" + timerObject.hours
                : timerObject.hours}
              {":"}
              {timerObject.minutes <= 9
                ? "0" + timerObject.minutes
                : timerObject.minutes}
              {":"}
              {timerObject.seconds <= 9
                ? "0" + timerObject.seconds
                : timerObject.seconds}
            </h1>
            <div className="buttons-container">
              <button
                className="start-button button"
                type="button"
                onClick={() => fnButtonStart()}
              >
                Start
              </button>
              <button
                className="stop-button button"
                type="button"
                onClick={() => fnButtonStop()}
              >
                Stop
              </button>
              <button
                className="restart-button button"
                type="button"
                onClick={() => fnButtonReset()}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StopWatch;
