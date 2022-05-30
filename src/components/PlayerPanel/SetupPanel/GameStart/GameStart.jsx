/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePlayerName } from '../../../../app/slices/playerSlice';
import { setGameState } from '../../../../app/slices/gameStateSlice';
import './gameStart.scss';

function GameStart({ generateCpuShips }) {
  const [playerName, setPlayerName] = useState('');

  const dispatch = useDispatch();

  const startTurn = () => {
    dispatch(savePlayerName(playerName));
    dispatch(setGameState('player-turn'));
    generateCpuShips()
  };

  return (
    <div className="play-ready">
      <p className="player-tip">Please, enter your<br /> name to begin.</p>
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
