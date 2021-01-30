const drumPads = [
  {
    keyId: "Q",
    sound: "heater-1",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyId: "W",
    sound: "heater-2",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyId: "E",
    sound: "heater-3",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyId: "A",
    sound: "heater-4",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyId: "S",
    sound: "clap",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyId: "D",
    sound: "open-hh",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyId: "Z",
    sound: "kick-hat",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyId: "X",
    sound: "kick",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyId: "C",
    sound: "closed-hh",
    soundSource: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
]

function DrumMachine(props) {
  const [sound, setSound] = React.useState("");
  
  function handleKeyPress(event) {
    const pressedPad = drumPads.find(pad => event.key.toUpperCase() === pad.keyId)
    if (pressedPad) {
      const button = document.getElementById(pressedPad.sound);
      button.click();
    };    
  }
  
  function handleClick(keyId, sound) {   
    setSound(sound);
    const audio = document.getElementById(keyId);
    audio.play();
  }
  
  React.useEffect(() => {
    console.log("useEffect")
    drumPads.forEach(pad => {
      const key = document.getElementById(pad.keyId);
      key.load();
    })    
    
    window.addEventListener('keypress', handleKeyPress);
    window.focus();
    
    return () => {
      this.removeEventListener('keypress', handleKeyPress);
    }
  }, [])
 
  return (
    <div id="drum-machine">
      <div id="title">Drum Machine</div>
      <div id="drum-pads">
        {drumPads.map(pad => <DrumPad key={pad.keyId} {...pad} handleClick={handleClick} />)}
      </div>
      <div id="display">{sound}</div>
    </div>
  );
}

function DrumPad(props)  {
  const handleClick = () =>  {
    props.handleClick(props.keyId, props.sound);
  }

  return (
    <>
      <button id={props.sound} className="drum-pad btn btn-secondary" onClick={handleClick}>
        {props.keyId}
        <audio className="clip" id={props.keyId} src={props.soundSource} />
      </button>
    </>
  );
}

ReactDOM.render(
  <DrumMachine />,
  document.getElementById("root")
);;
