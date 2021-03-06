function PomodoloClock() {
  return (
    <>
      <LengthControl kind="break" label="Break" default={5} />
      <LengthControl kind="session" label="Session" default={25} />
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
