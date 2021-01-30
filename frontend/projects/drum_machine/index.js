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

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sound: "" };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleKeyPress(event) {
    const pressedPad = drumPads.find(pad => event.key.toUpperCase() === pad.keyId)
    if (pressedPad) {
      this.setState({ sound: pressedPad.sound });
      const button = document.getElementById(pressedPad.sound);
      button.click();
    };    
  }
  
  handleClick(keyId, sound) {
    this.setState({ sound: sound });
    const audio = document.getElementById(keyId);
    audio.play();
  }
  
  componentDidMount() {
    drumPads.forEach(pad => {
      const key = document.getElementById(pad.keyId);
      key.load();
    })    
    
    window.addEventListener('keypress', this.handleKeyPress);
    window.focus();    
  }
  
  componentWillUnMount() {
    this.removeEventListener('keypress', this.handleKeyPress);
  }
 
  render() {
    return (
      <div id="drum-machine">
        <div id="title">Drum Machine</div>
        <div id="drum-pads">
          {drumPads.map(pad => <DrumPad key={pad.keyId} {...pad} handleClick={this.handleClick} />)}
        </div>
        <div id="display">{this.state.sound}</div>
      </div>
    );
  } 
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleClick(this.props.keyId, this.props.sound);
  }
  
  render() {
    return (
      <>
        <button id={this.props.sound} className="drum-pad btn btn-secondary" onClick={this.handleClick}>
          {this.props.keyId}
          <audio className="clip" id={this.props.keyId} src={this.props.soundSource} />
        </button>
      </>
    );
  }
}

ReactDOM.render(
  <DrumMachine />,
  document.getElementById("root")
);
