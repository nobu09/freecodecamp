function PomodoloClock(props) {
  const [breakLen, setBreakLen] = React.useState(5);
  const [sessionLen, setSessionLen] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState("25:00");

  const handleClickReset = () => {
    setBreakLen(5);
    setSessionLen(20);
    setTimeLeft("20:00");
  }

  return (
    <>
      <LengthControl kind="break" label="Break" length={breakLen} />
      <LengthControl kind="session" label="Session" length={sessionLen} />
      <div id="timer-label">Session</div>
      <div id="time-left">{timeLeft}</div>
      <button id="start_stop"><i class="fas fa-play-circle"></i></button>
      <button id="reset" onClick={handleClickReset} ><i class="fas fa-undo"></i></button>
    </>
  )
}

function LengthControl(props) {
  return (
    <div className="length-control">
      <div id={`${props.kind}-label`}>{props.label} length</div>
      <button id={`${props.kind}-increment`} className="btn-level">
        <i class="fas fa-caret-up"></i>
      </button>
      <div id={`${props.kind}-length`}>{props.length}</div>
      <button id={`${props.kind}-decrement`} className="btn-level ">
        <i class="fas fa-caret-down"></i>
      </button>
    </div>
  )
}

ReactDOM.render(
  <PomodoloClock />,
  document.getElementById("root")
);
