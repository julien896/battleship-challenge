/* eslint-disable */
import React from 'react';
import './commentsPanel.scss';

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
      <div className="title">The first to sink all 5<br />opponent ships wins.</div>
      {hitsByComputer.length > 0 || hitsByPlayer.length > 0 ? (
      <div className="fire-comments">
        {gameState === 'player-turn'
          ? `CPU last shot: ${hitsByComputer[hitsByComputer.length - 1].type.toUpperCase()}!`
          : `Your last shot: ${hitsByPlayer[hitsByPlayer.length - 1].type.toUpperCase()}!`}
      </div>
      ) : null}
      <div>
        <p className="game-state">
          {gameState === 'player-turn' ? 'Playing: You' : 'Playing: CPU'}
        </p>
        <button className="surrender" onClick={() => setSurrender(true)}>
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
