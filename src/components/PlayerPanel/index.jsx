import PropTypes from 'prop-types';
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
  startAgain,
  hitsByPlayer,
  hitsByComputer
}) {
  const gameState = useSelector((state) => state.gameState.gameState);

  return gameState !== 'placement' ? (
    <CommentsPanel
      winner={winner}
      surrender={surrender}
      setSurrender={setSurrender}
      gameState={gameState}
      startAgain={startAgain}
      hitsByComputer={hitsByComputer}
      hitsByPlayer={hitsByPlayer}
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

PlayerPanel.propTypes = {
  availableShips: PropTypes.array.isRequired,
  currentlyPlacing: PropTypes.bool.isRequired,
  generateCpuShips: PropTypes.func.isRequired,
  hitsByComputer: PropTypes.array.isRequired,
  hitsByPlayer: PropTypes.array.isRequired,
  selectShip: PropTypes.func.isRequired,
  setSurrender: PropTypes.func.isRequired,
  startAgain: PropTypes.func.isRequired,
  surrender: PropTypes.bool.isRequired,
  winner: PropTypes.string.isRequired
};

export default PlayerPanel;
