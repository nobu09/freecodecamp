function PomodoloClock(props) {
  const defaultSession = 25;
  const defaultTimeLeft = defaultSession * 60;
  const [breakLen, setBreakLen] = React.useState(5);
  const [sessionLen, setSessionLen] = React.useState(defaultSession);
  const [timeLeft, setTimeLeft] = React.useState(defaultTimeLeft);
  const [timer, setTimer] = React.useState(false);

  React.useEffect(() => {
    if (timer) {
      const timerId = setInterval(countDown, 1000);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  const countDown = () => {
    setTimeLeft(prevTimeLeft => {
      return (prevTimeLeft - 1) > 0 ? prevTimeLeft - 1 : sessionLen;
    })
  }

  const handleClickReset = () => {
    setBreakLen(5);
    setSessionLen(defaultSession);
    setTimeLeft(defaultTimeLeft);
    setTimer(false);
  }

  const handleStartStop = () => {
    setTimer(!timer);
  }

  function displayTimeLeft() {
    const minutes = String(Math.floor(timeLeft / 60));
    const seconds = String(timeLeft % 60);
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  return (
    <>
      <LengthControl kind="break" label="Break" length={breakLen} />
      <LengthControl kind="session" label="Session" length={sessionLen} />
      <div id="timer-label">Session</div>
      <div id="time-left">{displayTimeLeft()}</div>
      <button id="start_stop" onClick={handleStartStop}><i className="fas fa-play-circle"></i></button>
      <button id="reset" onClick={handleClickReset} ><i className="fas fa-undo"></i></button>
    </>
  )
}

function LengthControl(props) {
  return (
    <div className="length-control">
      <div id={`${props.kind}-label`}>{props.label} length</div>
      <button id={`${props.kind}-increment`} className="btn-level">
        <i className="fas fa-caret-up"></i>
      </button>
      <div id={`${props.kind}-length`}>{props.length}</div>
      <button id={`${props.kind}-decrement`} className="btn-level ">
        <i className="fas fa-caret-down"></i>
      </button>
    </div>
  )
}

ReactDOM.render(
  <PomodoloClock />,
  document.getElementById("root")
);
