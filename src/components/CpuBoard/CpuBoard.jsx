/* eslint-disable */
import React from 'react';
import {
  generateEmptyLayout,
  stateToClassName,
  SQUARE_STATE,
  putEntityInLayout
} from '../../constants/layout';
import '../../styles/base/board.scss';

function CpuBoard({ cpuShips }) {
/*   const squares = generateEmptyLayout().map((square, index) => (
    <div
      className={`square ${stateToClassName[square]}`}
      id={`square-${index}`}
    />
  )); */

  const cpuLayout = cpuShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  const cpuSquares = cpuLayout.map((square, index) => {
    return (
      <div
        className={
          stateToClassName[square] === 'hit' ||
          stateToClassName[square] === 'miss' ||
          stateToClassName[square] === 'ship-sunk'
            ? `square ${stateToClassName[square]}`
            : `square`
        }
        id={`comp-square-${index}`}
      />
    );
  });
  return (
    <div className="board-container">
      <h2 className="player-name">CPU</h2>
      <div className="board">{cpuSquares}</div>
    </div>
  );
}

export default CpuBoard;
