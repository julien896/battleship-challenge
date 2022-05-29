/* eslint-disable */
import React from 'react';
import { generateEmptyLayout, stateToClassName } from '../../constants/layout';
import './playerBoard.scss';


function PlayerBoard() {
    const squares = generateEmptyLayout().map((square, index) => {
        return (
          <div
            className={`square ${stateToClassName[square]}`}
            key={`square-${index}`}
            id={`square-${index}`}
          />
        );
      });
  return <div className='board'>{squares}</div>;
}

export default PlayerBoard;
