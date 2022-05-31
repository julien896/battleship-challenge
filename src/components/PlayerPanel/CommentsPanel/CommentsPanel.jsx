import PropTypes from 'prop-types';
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
  const gameOverState = () => {
    if (winner === 'cpu' && surrender) {
      return 'You surrendered!';
    }
    if (winner === 'cpu' && !surrender) {
      return 'You lose!';
    }
    return 'You win!';
  };

  const gameOver = (
    <div className="game-over">
      <div className="title">Game Over!</div>
      <p data-testid="winner" className="winner">
        {gameOverState()}
      </p>
      <button
        data-testid="restart"
        type="button"
        className="restart"
        onClick={startAgain}
      >
        Start Screen
      </button>
    </div>
  );

  const comments = (
    <div className="comments">
      <div className="title">
        The first to sink all 5<br />
        opponent ships wins.
      </div>
      {hitsByComputer.length > 0 || hitsByPlayer.length > 0 ? (
        <div className="fire-comments">
          {gameState === 'player-turn'
            ? `CPU last shot: ${hitsByComputer[
                hitsByComputer.length - 1
              ].type.toUpperCase()}!`
            : `Your last shot: ${hitsByPlayer[
                hitsByPlayer.length - 1
              ].type.toUpperCase()}!`}
        </div>
      ) : null}
      <div>
        <p data-testid="game-state" className="game-state">
          {gameState === 'player-turn' ? 'Playing: You' : 'Playing: CPU'}
        </p>
        <button
          type="button"
          className="surrender"
          onClick={() => setSurrender(true)}
        >
          Surrender
        </button>
      </div>
    </div>
  );

  return (
    <div className="comments-container">{winner ? gameOver : comments}</div>
  );
}

CommentsPanel.propTypes = {
  gameState: PropTypes.string.isRequired,
  hitsByComputer: PropTypes.shape({
    length: PropTypes.number
  }).isRequired,
  hitsByPlayer: PropTypes.shape({
    length: PropTypes.number
  }).isRequired,
  setSurrender: PropTypes.func.isRequired,
  startAgain: PropTypes.func.isRequired,
  surrender: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired
};

export default CommentsPanel;
