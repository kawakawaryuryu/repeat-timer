import React, {useState} from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [numberOfTimes, setNumberOfTimes] = useState(0);
  const [timeInterval, setTimeInterval] = useState(0);
  const [intervalID, setIntervalID] = useState(0);

  const changeNumberOfTimes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = parseInt(e.target.value);
    const numberOfTimes = !isNaN(changedValue) ? changedValue : 0;
    setNumberOfTimes(numberOfTimes);
  };

  const changeInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = parseInt(e.target.value);
    const interval = !isNaN(changedValue) ? changedValue : 0;
    setTimeInterval(interval);
    setCount(interval);
  };

  const clickButton = () => {
    if (!intervalID) {
      let baseDateTime = new Date();
      let countOfTimes = 0;
      setCount(timeInterval);
      const intervalID = window.setInterval(() => {
        const now = new Date();
        const elapsedSeconds = Math.round((now.getTime() - baseDateTime.getTime())/1000);
        const remainingCount = timeInterval - elapsedSeconds;
        if (remainingCount <= 0) {
          playBell();
          setCount(timeInterval);
          countOfTimes = countOfTimes + 1;
          baseDateTime = new Date();
          if (countOfTimes >= numberOfTimes) {
            window.clearInterval(intervalID);
          }
          return;
        }
        setCount(remainingCount);
      }, 1000);
      setIntervalID(intervalID);
    } else {
      window.clearInterval(intervalID);
      setIntervalID(0);
    }
  };

  return (
    <div className="App">
      <div className="timer">
        <button onClick={clickButton}>Start/Stop</button>
        <div>{count}</div>
      </div>
      <div className="input">
        <label className="label">インターバル</label>
        <input type="number" onChange={changeInterval} />秒
      </div>
      <div className="input">
        <label className="label">回数</label>
        <input type="number" onChange={changeNumberOfTimes} />回
      </div>
    </div>
  );
}

function playBell() {
  const audio = new Audio('bell.mp3');
  audio.load();
  audio.play();
}

export default App;
