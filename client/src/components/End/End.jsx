import React from 'react';
import style from 'styles.css';

export default function End (props) {
  return <div>
    <div>You scored {`${props.correctCount} out of ${props.totalCount}!`} </div>
    <div>The average score for people who have tried Zonkey is 5</div>
    <button type="button">Try Again</button>
  </div>
}