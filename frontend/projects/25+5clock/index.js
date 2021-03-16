function PomodoloClock(props) {
  const [breakLen, setBreakLen] = React.useState(5);
  const [sessionLen, setSessionLen] = React.useState(25);

  const handleClickReset = () => {
    setBreakLen(5);
    setSessionLen(25);
  }

  return (
    <>
      <LengthControl kind="break" label="Break" default={5} />
      <LengthControl kind="session" label="Session" default={25} />
      <div id="timer-label">Session</div>
      <div id="time-left">25:00</div>
      <button id="start_stop"><i class="fas fa-play-circle"></i></button>
      <button id="reset"><i class="fas fa-undo"></i></button>
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
      <div id={`${props.kind}-length`}>{props.default}</div>
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
