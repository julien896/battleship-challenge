import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePlayerName } from '../../../app/slices/playerSlice';
import './gameStart.scss';

function GameStart() {
  const [playerName, setPlayerName] = useState('');
  const dispatch = useDispatch();

  const startTurn = () => {
    dispatch(savePlayerName(playerName));
  };

  return (
    <div className="play-ready">
      <p className="player-tip">Please, enter your name to begin.</p>
      <input
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Player name"
      />
      <button
        disabled={playerName === ''}
        onClick={startTurn}
        className="play-button"
        type="button"
      >
        Start game
      </button>
    </div>
  );
}

export default GameStart;
