/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import CommentsPanel from './CommentsPanel/CommentsPanel';
import SetupPanel from './SetupPanel/SetupPanel';

function PlayerPanel({ availableShips, selectShip, currentlyPlacing, generateCpuShips }) {
  const gameState = useSelector((state) => state.gameState.gameState);

  return gameState !== 'placement' ? (
    <CommentsPanel />
  ) : (
    <SetupPanel
      availableShips={availableShips}
      selectShip={selectShip}
      currentlyPlacing={currentlyPlacing}
      generateCpuShips={generateCpuShips}
    />
  );
}

export default PlayerPanel;
