import React from 'react';
import './ResList.css';

export default props =>  (
    <div style={{
        border: '1px solid #ccc',
        marginBottom: '10px',
        marginTop: '10px',
        display: 'block',
        padding: '10px'
      }}
      className={props.divClass}>
        <p>Value: {props.value}</p>
        <button onClick={props.onDelete}>X</button>
    </div>
)