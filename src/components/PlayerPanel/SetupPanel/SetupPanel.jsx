import PropTypes from 'prop-types';
import React from 'react';
import GameStart from './GameStart/GameStart';
import ShipsDisposition from './ShipsDisposition/ShipsDisposition';

function SetupPanel({
  availableShips,
  selectShip,
  currentlyPlacing,
  startTurn,
  generateCpuShips,
  startAgain
}) {
  return (
    <div>
      {availableShips.length > 0 ? (
        <ShipsDisposition
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
          startAgain={startAgain}
        />
      ) : (
        <GameStart startTurn={startTurn} generateCpuShips={generateCpuShips} />
      )}
    </div>
  );
}

SetupPanel.propTypes = {
  availableShips: PropTypes.shape({
    length: PropTypes.number
  }).isRequired,
  currentlyPlacing: PropTypes.bool.isRequired,
  generateCpuShips: PropTypes.func.isRequired,
  selectShip: PropTypes.func.isRequired,
  startAgain: PropTypes.func.isRequired,
  startTurn: PropTypes.func.isRequired
};

export default SetupPanel;
