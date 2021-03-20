function PomodoloClock(props) {
  const [breakLen, setBreakLen] = React.useState(5);
  const [sessionLen, setSessionLen] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState(25);
  const [timer, setTimer] = React.useState(false);

  React.useEffect(() => {
    console.log(`setInterval: ${timer}`);
    if (timer) {
      const timerId = setInterval(countDown, 1000);
      return () => clearInterval(timerId);
    }
  }, [timer]);

  const countDown = () => {
    setTimeLeft(prevTimeLeft => {
      return (prevTimeLeft - 1) > 0 ? prevTimeLeft - 1 : sessionLen;
    });
  }

  const handleClickReset = () => {
    setBreakLen(5);
    setSessionLen(25);
    setTimeLeft(25);
    setTimer(false);
  }

  const handleStartStop = () => {
    setTimer(prevTimer => !prevTimer);
  }

  return (
    <>
      <LengthControl kind="break" label="Break" length={breakLen} />
      <LengthControl kind="session" label="Session" length={sessionLen} />
      <div id="timer-label">Session</div>
      <div id="time-left">{timeLeft}</div>
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
