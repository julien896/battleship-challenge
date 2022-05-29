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
  const [placedShips, setPlacedShips] = useState([]);

  // *** PLAYER ***
  const selectShip = (shipName) => {
    const shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
    const shipToPlace = availableShips[shipIdx];

    setCurrentlyPlacing({
      ...shipToPlace,
      orientation: 'horizontal',
      position: null
    });
  };

  const placeShip = (currentlyPlacing) => {
    setPlacedShips([
      ...placedShips,
      {
        ...currentlyPlacing,
        placed: true,
      },
    ]);

    setAvailableShips((previousShips) =>
      previousShips.filter((ship) => ship.name !== currentlyPlacing.name)
    );

    setCurrentlyPlacing(null);
  };

  const rotateShip = (event) => {
    if (currentlyPlacing != null && event.button === 2) {
      setCurrentlyPlacing({
        ...currentlyPlacing,
        orientation:
          currentlyPlacing.orientation === 'vertical' ? 'horizontal' : 'vertical',
      });
    }
  };
  return (
    <div className="game-screen">
      <PlayerPanel
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
      />
      <PlayerBoard 
        placeShip={placeShip} 
        placedShips={placedShips} 
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
      />
      <CpuBoard />
    </div>
  );
}

export default GameScreen;
