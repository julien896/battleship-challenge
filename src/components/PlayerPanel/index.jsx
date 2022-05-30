/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import CommentsPanel from './CommentsPanel/CommentsPanel';
import SetupPanel from './SetupPanel/SetupPanel';

function PlayerPanel({
  availableShips,
  selectShip,
  currentlyPlacing,
  generateCpuShips,
  surrender,
  setSurrender,
  winner,
  startAgain
}) {
  const gameState = useSelector((state) => state.gameState.gameState);

  return gameState !== 'placement' ? (
    <CommentsPanel 
      winner={winner}
      surrender={surrender}
      setSurrender={setSurrender}
      gameState={gameState}
      startAgain={startAgain}
    />
  ) : (
    <SetupPanel
      availableShips={availableShips}
      selectShip={selectShip}
      currentlyPlacing={currentlyPlacing}
      generateCpuShips={generateCpuShips}
      startAgain={startAgain}
    />
  );
}

export default PlayerPanel;
