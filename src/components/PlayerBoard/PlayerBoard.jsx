import React from 'react';
import { generateEmptyLayout, stateToClassName } from '../../constants/layout';
import '../../styles/base/board.scss';

function PlayerBoard() {
  const squares = generateEmptyLayout().map((square, index) => (
    <div
      className={`square ${stateToClassName[square]}`}
      id={`square-${index}`}
    />
  ));
  return (
    <div className="board-container">
      <h2 className="player-name">Player1</h2>
      <div className="board">{squares}</div>
    </div>
  );
}

export default PlayerBoard;
