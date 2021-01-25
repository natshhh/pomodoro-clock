import React from 'react';

function Length(props) {
    return(
      <div className='lengths-box'>
        <h2 id={props.id} className='length-titles'>
          {props.name + ' Length'}
        </h2>

        <div className='custom'>
          <button
            style={props.showArrows
              ? {} : { display: 'none' }}
            id={props.decr}
            className="length-arrows"
            onClick={() => {props.handleClick(props.decr)}}>
              <i className="fa fa-arrow-down fa-2x" />-
          </button>

          <span
            id={props.name.toLowerCase() + '-length'}

            className='length-time'>
              {props.length}
          </span>

          <button
            style={props.showArrows
              ? {} : { display: 'none' }}
            id={props.incr}
            className='length-arrows'
            onClick={() => {props.handleClick(props.incr)}}>
              <i className="fa fa-arrow-up fa-2x" />+
          </button>
        </div>
      </div>
    )
}

export default Length;
