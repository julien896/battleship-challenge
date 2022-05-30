/* eslint-disable */
import React from 'react';

function CommentsPanel({
  winner,
  surrender,
  setSurrender,
  gameState,
  startAgain,
  hitsByComputer,
  hitsByPlayer
}) {
  const gameOver = (
    <div className="game-over">
      <div className="title">Game Over!</div>
      <p className="winner">
        {winner === 'cpu' && surrender
          ? 'You surrendered!'
          : winner === 'cpu' && !surrender
          ? 'You lose! '
          : 'You win!'}
      </p>
      <button className="restart" onClick={startAgain}>
        Start Screen
      </button>
    </div>
  );

  const comments = (
    <div className="comments">
      <div className="title">The first to sink all 5 opponent ships wins.</div>
      <div>
        {gameState === 'player-turn'
          ? hitsByComputer.length &&
            `${hitsByComputer[hitsByComputer.length - 1].type.toUpperCase()}!`
          : hitsByPlayer.length &&
            `${hitsByPlayer[hitsByPlayer.length - 1].type.toUpperCase()}!`}
      </div>
      <div>
        <p className="game-state">
          {gameState === 'player-turn' ? 'Playing: You' : 'Playing: CPU'}
        </p>
        <button className="restart" onClick={() => setSurrender(true)}>
          Surrender
        </button>
      </div>
    </div>
  );

  return (
    <div className="comments-container">{winner ? gameOver : comments}</div>
  );
}

export default CommentsPanel;
