import React from 'react';
let time;
function Timer(props){
  time = props.timerType==='Session' ? props.sessionMinutes : props.breakMinutes;
     return(
       <div id='timer-box'>
         <h2 id='timer-label'>{props.timerType}</h2>

         <div id='time-left'>
           <span>{time === 0 ?
                 '00' :
                 time < 10 ?
                 '0' + time :
                 time}
           </span>
           <span>:</span>
           <span>{props.seconds === 0 ?
                 '00' :
                 props.seconds < 10 ?
                 '0' + props.seconds :
                 props.seconds}
           </span>
         </div>
         <div >
           <button
             id='start_stop'
             className='start-reset-buttons'
             onClick={props.handleStart}>
             Stop/Resume
              <i class="fa fa-play" aria-hidden="true"></i><i class="fa fa-pause" aria-hidden="true"></i>
            </button>
            <button
              id='reset'
              className='start-reset-buttons'
              onClick={props.handleReset}
              style={{fontSize: 26}}>
                <i class="fa fa-retweet" aria-hidden="true"></i>Restart
             </button>
           </div>
         </div>
  )
}

export default Timer;
