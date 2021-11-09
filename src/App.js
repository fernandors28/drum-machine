//import logo from './logo.svg';
import './App.css';
import react from 'react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];


const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];
const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};

class ButtonMusic extends react.Component{
  constructor(props){
    super(props);
    this.state={
     padStyle: inactiveStyle
    }
    this.soundPand=this.soundPand.bind(this);
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.activePand=this.activePand.bind(this);
   

  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress)
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress(event){
    if(event.keyCode === this.props.keyCode){
      this.soundPand();
    }
  }
  activePand(){
    if(this.props.power){
      if(this.state.padStyle.backgroundColor === 'orange'){
        this.setState({
          padStyle: inactiveStyle
        });
      }else{
        this.setState({
          padStyle: activeStyle
        });
      }
    }else if(this.state.padStyle.marginTop === '13'){
      this.setState({
      padStyle:inactiveStyle
      })
    }else{
      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: 'grey',
          boxShadow: '0 3px grey'
        }
      })
    }
  }
  soundPand(){
  var sound= document.getElementById(this.props.keyTrigger);
  sound.currentTime=0;
  sound.play();
  this.activePand()
  setTimeout(() => this.activePand(), 100)
  
 
  this.props.UpdateDisplay(this.props.clipId.replace(/-/g, ' '));
  
  };
  render(){
    console.log(this.soundPand)
    return(
      <div 
        className={this.props.class} 
        id= {this.props.clipId} 
        onClick={this.soundPand}
        style={this.state.padStyle}
      >
        <audio 
          className='clip' 
          id={this.props.keyTrigger} 
          src={this.props.clip}>
        </audio>
        {this.props.keyTrigger}
      </div>  
    )
  }
};
class PadButton extends react.Component{
  constructor(props){
    super(props);
  
  }
  render(){
    console.log(this.props.update)
    var pad;
    if(this.props.power){
      pad = this.props.currentPand.map((a, i , arr) => {
       
        return(
          <ButtonMusic
            class="drum-pad"
            clip={arr[i].url}
            clipId={arr[i].id}
            keyCode={arr[i].keyCode}
            keyTrigger={arr[i].keyTrigger}
            power={this.props.power}
            UpdateDisplay={this.props.UpdateDisplay}
          />
        );
      })
    }else{
       pad = this.props.currentPand.map((a, i , arr)=>{
          return(
            <ButtonMusic
              class="drum-pad"
              clip='#'
              clipId={arr[i].id}
              keyCode={arr[i].keyCode}
              keyTrigger={arr[i].keyTrigger}
              power={this.props.power}
              UpdateDisplay={this.props.UpdateDisplay}
            />
          );
        }
      );
    } 
    return(
        <div className='pad'>
          {pad}
        </div>
    )
  }
}

class App extends react.Component{
  constructor(props){
    super(props);
    this.state={
      power: true,
      display: String.fromCharCode(160),
      padBank: bankOne,
      padBankId: 'Heater Kit',
      sliderVal: 0.3

    }
   // this.controlPower= this.controlPower.bind(this);
    this.clearDisplay= this.clearDisplay.bind(this);
    this.powerControl=this.powerControl.bind(this);
    this.SelectBank=this.SelectBank.bind(this);
    this.AjustVol=this.AjustVol.bind(this)
    this.UpdateDisplay=this.UpdateDisplay.bind(this)
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }
  UpdateDisplay(name){
    if(this.state.power){
      this.setState({
        display: name
      });
    }  
  }
  clearDisplay(){
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  // eslint-disable-next-line no-dupe-class-members
  clearDisplay(){
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  AjustVol(e){
    if(this.state.power){
      console.log(e.target.value)
      this.setState({
        
        sliderVal: e.target.value,
        display: 'volumen:'+ Math.round(e.target.value * 100)
        
      })
        setTimeout(()=> this.clearDisplay(), 1000)
      }
    }
  SelectBank(){
    
    if(this.state.power){
      if(this.state.padBankId === 'Heater Kit'){
        this.setState({
          padBank: bankTwo,
          display: 'Smooth Pian Kit',
          padBankId: 'Smooth Pian Kit'
         
        });
      }else{
        this.setState({
          padBank: bankOne,
          display:'Heater Kit',
          padBankId:'Heater Kit'          
        });
      }
    }
  };
  
  render(){
  
    var energy;
    if(this.state.power === false){
      energy ={
        float: 'left'
      }

      }else{
        energy = {
          float: 'right'
        }
    }
    var color;
    if(this.state.power === false){
      color={
        backgroundColor : '#A6ACAF '
      };
    }else{
      color={
        backgroundColor : '#00FF00'
      } 
    }
    
    var bankbuttom;
    if(this.state.padBank === bankOne){
     bankbuttom ={
       float: 'right'
     }
    }else{
      bankbuttom ={
        float: 'left'
      }
    }
      
    return (
      <div className="App">
        <header className="App-header">
          <div class="inner-machine" id="drum-machine">
            
            <PadButton
              volume={this.state.sliderVal}
              currentPand={this.state.padBank}
              power={this.state.power}
              UpdateDisplay={this.UpdateDisplay}
            />
            <div className='controls'>
              <div id="power">
                <p className="text">Power</p>
                <div className='Buttom' onClick={this.powerControl} style={color}>
                  <div className='select' style={energy} ></div>
                </div>
              </div> 
              <p id="display">{this.state.display}</p>
              <div>  
                <input 
                  classNane="Volumen"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={this.AjustVol}
                  value={this.state.sliderVal}
                />
              </div>  
              <div id="bank">
                <p className="text">Bank</p>
                <div className='Buttom' onClick={this.SelectBank}>
                  <div className='select' style={bankbuttom} ></div>
                </div>
              </div> 
            </div>
          </div>
        </header>
      </div>
    );
  }
};



export default App;
/*<ButtonsMusical/>*/ 