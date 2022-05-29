/* eslint-disable */
import React, { useState } from 'react';
import CpuBoard from '../CpuBoard/CpuBoard';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import AVAILABLE_SHIPS from '../../constants/game';
import './gameScreen.scss';

function GameScreen() {
  const [winner, setWinner] = useState(null);
  const [availableShips, setAvailableShips] = useState(AVAILABLE_SHIPS);

  return (
    <div className="game-screen">
      <PlayerPanel
        availableShips={availableShips}
       />
      <PlayerBoard />
      <CpuBoard />
    </div>
  );
}

export default GameScreen;
