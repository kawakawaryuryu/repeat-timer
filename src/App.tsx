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
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <div className="timer">
        <button onClick={clickButton}>Start/Stop</button>
        <div>{count}</div>
      </div>
      <div className="input">
        <label>how many times</label>
        <input type="number" onChange={changeNumberOfTimes} />
      </div>
      <div className="input">
        <label>interval</label>
        <input type="number" onChange={changeInterval} />
      </div>
    </div>
  );
}

export default App;
