import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [brake, setBrake] = React.useState(5);
  const [session, setSession] = React.useState(25);
  const [time, setTime] = React.useState(1500);
  const [start, setStart] = React.useState(false);
  const [type, setType] = React.useState('session');
  let timerRef = useRef(null)
  let typeRef = useRef(type)
  console.log(time)
  console.log(type)

  let audio = document.getElementById('beep')

  const getTime = () => {
    const getMinutes = Math.floor(time / 60);
    const getSeconds = time - getMinutes * 60;
    const minutes = getMinutes < 10 ? '0' + getMinutes : getMinutes;
    const seconds = getSeconds < 10 ? '0' + getSeconds : getSeconds;
    
    return `${minutes}:${seconds}`
  }

  const incrementBrake = () => {
    if (brake < 60) {
      setBrake(brake + 1);
    }
  }

  const decrementBrake = () => {
    if (brake > 1) {
      setBrake(brake - 1);
    }
  }

  const incrementSession = () => {
    if (session < 60) {
      setSession(session + 1);
      setTime(time + 60)
    }
  }

  const decrementSession = () => {
    if (session > 1) {
      setSession(session - 1);
      setTime(time - 60)
    }
  }

  useEffect(() => {
  typeRef.current = type;
}, [type]);

  useEffect(()=> {
    if (start) {
      timerRef.current = setInterval(()=>{
        setTime((prevTime) => {
          console.log('prevTime')
          if (!prevTime && typeRef.current === 'session') {
            setType('break');
            console.log(type, "inside setTime")
            audio.play();
            return brake * 60
          } else if (!prevTime && typeRef.current === 'break') {
            setType('session');
            console.log("yeah")
            audio.play();
            return session * 60
          }
          return prevTime - 1
        })
        console.log(type, "outside setTIme")
      }, 1000)
      console.log(start, 'true')
    } else {
      clearInterval(timerRef.current)
      console.log(start, 'false')
    }
    console.log('useEffect')

  }, [start])

  const handleReset = () => {
    setBrake(5);
    setSession(25);
    setTime(1500)
    setStart(false)
    setType('session')
    audio.pause()
    audio.currentTime = 0;
  }

  return (
    <div className='w-fit mx-auto'>
      <label id='break-label'>Break Length</label>
      <button onClick={incrementBrake} id='break-increment'>+</button>
      <button onClick={decrementBrake} id='break-decrement'>-</button>
      <div id='break-length'>{brake}</div>

      <label id='session-label'>Session Length</label>
      <button onClick={incrementSession} id='session-increment'>+</button>
      <button onClick={decrementSession} id='session-decrement'>-</button>
      <div id='session-length'>{session}</div>

      <label id='timer-label'>{type}</label>
      <div id='time-left'>{getTime()}</div>
      <button onClick={()=> setStart(!start)} id='start_stop'>Start&Stop</button><br></br>
      <button onClick={handleReset} id='reset'>Reset</button>

      <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
  );
}

export default App;
