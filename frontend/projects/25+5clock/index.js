function PomodoloClock(props) {
  const defaultSession = 25;
  const defaultTimeLeft = defaultSession * 60;
  const [breakLen, setBreakLen] = React.useState(5);
  const [sessionLen, setSessionLen] = React.useState(defaultSession);
  const [timeLeft, setTimeLeft] = React.useState(defaultTimeLeft);
  const [timer, setTimer] = React.useState(false);
  const [isSession, setIsSession] = React.useState(true);

  const countDown = () => {
    setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
  }

  React.useEffect(() => {
    if (timer) {
      const timerId = setInterval(countDown, 1000);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  React.useEffect(() => {
    if (timeLeft == 0) {
      setIsSession(!isSession);
      const audio = document.getElementById("beep");
      audio.play();
    }
  }, [timeLeft]);

  React.useEffect(() => {
    if (isSession) {
      setTimeLeft(sessionLen * 60);
    } else {
      setTimeLeft(breakLen * 60);
    }
  }, [isSession])

  React.useEffect(() => {
    if (isSession) {
      setTimeLeft(sessionLen * 60);
    }
  }, [sessionLen])

  React.useEffect(() => {
    if (!isSession) {
      setTimeLeft(breakLen * 60);
    }
  }, [breakLen])

  const handleClickReset = () => {
    setBreakLen(5);
    setSessionLen(defaultSession);
    setTimeLeft(defaultTimeLeft);
    setTimer(false);
    setIsSession(true);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }

  const handleStartStop = () => {
    setTimer(!timer);
  }

  const onClickSessionIncrement = () => {
    if (sessionLen < 60) {
      setSessionLen(sessionLen + 1);
    }
  }

  const onClickSessionDecrement = () => {
    if (sessionLen > 1) {
      setSessionLen(sessionLen - 1);
    }
  }

  const onClickBreakIncrement = () => {
    if (breakLen < 60) {
      setBreakLen(breakLen + 1);
    }
  }

  const onClickBreakDecrement = () => {
    if (breakLen > 1) {
      setBreakLen(breakLen - 1);
    }
  }

  function displayTimeLeft() {
    const minutes = String(Math.floor(timeLeft / 60));
    const seconds = String(timeLeft % 60);
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  return (
    <>
      <LengthControl kind="break" label="Break" length={breakLen} onClickIncrement={onClickBreakIncrement} onClickDecrement={onClickBreakDecrement}/>
      <LengthControl kind="session" label="Session" length={sessionLen} onClickIncrement={onClickSessionIncrement} onClickDecrement={onClickSessionDecrement} />
      <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{displayTimeLeft()}</div>
      <button id="start_stop" onClick={handleStartStop}><i className="fas fa-play-circle"></i></button>
      <button id="reset" onClick={handleClickReset} ><i className="fas fa-undo"></i></button>
      <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </>
  )
}

function LengthControl(props) {
  return (
    <div className="length-control">
      <div id={`${props.kind}-label`}>{props.label} length</div>
      <button id={`${props.kind}-increment`} className="btn-level" onClick={props.onClickIncrement}>
        <i className="fas fa-caret-up"></i>
      </button>
      <div id={`${props.kind}-length`}>{props.length}</div>
      <button id={`${props.kind}-decrement`} className="btn-level" onClick={props.onClickDecrement}>
        <i className="fas fa-caret-down"></i>
      </button>
    </div>
  )
}

ReactDOM.render(
  <PomodoloClock />,
  document.getElementById("root")
);
