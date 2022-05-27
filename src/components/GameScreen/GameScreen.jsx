import React from 'react';
import CpuBoard from '../CpuBoard/CpuBoard';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import PlayerPanel from '../PlayerPanel/PlayerPanel';
import './gameScreen.scss';

function GameScreen() {
  return (
    <div className="game-screen">
      <PlayerPanel />
      <PlayerBoard />
      <CpuBoard />
    </div>
  );
}

export default GameScreen;
