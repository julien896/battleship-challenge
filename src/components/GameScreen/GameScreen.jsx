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

  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);

    // *** PLAYER ***
    const selectShip = (shipName) => {
      let shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
      const shipToPlace = availableShips[shipIdx];
  
      setCurrentlyPlacing({
        ...shipToPlace,
        orientation: 'horizontal',
        position: null,
      });
    };
    console.log("currentlyPlacing", currentlyPlacing);
  return (
    <div className="game-screen">
      <PlayerPanel
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
       />
      <PlayerBoard />
      <CpuBoard />
    </div>
  );
}

export default GameScreen;
