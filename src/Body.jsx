import React from 'react';

import Length from './Length.jsx';
import Timer from './Timer.jsx';

const audio = ('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');

class Body extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sessionLength: 25,
      sessionTimerMinutes: 25,
      sessionTimerSeconds: 0,
      breakLength: 5,
      breakTimerMinutes: 5,
      resumeBtn: 'start',
      timerType: 'Session',
      showArrows: true,
    }
    this.handleClick=this.handleClick.bind(this);
    this.handleReset=this.handleReset.bind(this);
    this.handleStart=this.handleStart.bind(this);
    this.countDown=this.countDown.bind(this);
  }

  handleClick(id){
    if(id==='break-decrement' && this.state.breakLength>1){
      this.setState({
        breakLength: this.state.breakLength-1,
        breakTimerMinutes: this.state.breakTimerMinutes-1
      })
    }else if(id==='break-increment' && this.state.breakLength<60){
      this.setState({
        breakLength: this.state.breakLength+1,
        breakTimerMinutes: this.state.breakTimerMinutes+1
      })

    }else if(id==='session-decrement' && this.state.sessionLength>1){
      this.setState({
        sessionLength: this.state.sessionLength-1,
        sessionTimerMinutes: this.state.sessionTimerMinutes-1
      })
    }else if (id==='session-increment' && this.state.sessionLength<60){
      this.setState({
        sessionLength: this.state.sessionLength+1,
        sessionTimerMinutes: this.state.sessionTimerMinutes+1
      })
    }
  }
  handleReset(){
    this.setState({
      sessionLength: 25,
      sessionTimerMinutes: 25,
      sessionTimerSeconds: 0,
      breakLength: 5,
      breakTimerMinutes: 5,
      timerType: 'Session',
      showArrows: true
    })
    clearInterval(this.countdown);
    document.getElementById('timer-box').classList.remove("animation");
  }
  handleStart(){
    if(this.state.resumeBtn==='start'){
      this.countdown = setInterval(this.countDown, 1000);
      document.getElementById('timer-box').style.animationPlayState='running';
      this.setState({
        resumeBtn: 'stop',
        showArrows: false,
      })
    }
    else if(this.state.resumeBtn==='stop'){
      clearInterval(this.countdown);
      document.getElementById('timer-box').style.animationPlayState='paused';

      this.setState({
        resumeBtn: 'start',
        showArrows: false,
      })
    }
  }
  countDown(){
    switch(this.state.sessionTimerSeconds){
      case 0:
        if(this.state.timerType==='Session'){
          document.getElementById('timer-box').classList.add("animation");
          document.getElementById('timer-box').style.animationPlayState='running';
          document.getElementById('timer-box').style.animationDuration=(this.state.sessionLength*60).toString()+'s';

          if(this.state.sessionTimerMinutes===0){
            this.audio.play();
            this.setState({
              timerType: 'Break',
              breakTimerMinutes: this.state.breakLength,
            })
          }
          else{
            this.setState({
              sessionTimerMinutes: this.state.sessionTimerMinutes-1,
              sessionTimerSeconds: 59
            })
          }
        }
        else if(this.state.timerType==='Break'){
          if(this.state.breakTimerMinutes===0){
            this.audio.play();
            this.setState({
              timerType: 'Session',
              sessionTimerMinutes: this.state.sessionLength,
            })
          }
          else{
            this.setState({
              breakTimerMinutes: this.state.breakTimerMinutes-1,
              sessionTimerSeconds: 59
            })
          }
        }
        break;

      default:
        this.setState({
        sessionTimerSeconds: this.state.sessionTimerSeconds-1
        })
    }
  }

  render(){

    return(
      <div>
        <div className='container'>
          <Length id='break-label'
            name='Break'
            length={this.state.breakLength}
            handleClick={this.handleClick}
            decr='break-decrement'
            incr='break-increment'
            showArrows={this.state.showArrows} />
          <Length id='session-label'
            name='Session'
            length={this.state.sessionLength}
            handleClick={this.handleClick}
            decr='session-decrement'
            incr='session-increment'
            showArrows={this.state.showArrows} />
         </div>
          <Timer
            timerType={this.state.timerType}
            sessionMinutes={this.state.sessionTimerMinutes}
            breakMinutes={this.state.breakTimerMinutes}
            seconds={this.state.sessionTimerSeconds}
            handleReset={this.handleReset}
            handleStart={this.handleStart}
            />
          <audio src={audio} ref={ref => this.audio = ref}></audio>
      </div>

    )
  }
}


export default Body;
