/* eslint-disable */
import React from 'react';
import GameStart from './GameStart/GameStart';
import ShipsDisposition from './ShipsDisposition/ShipsDisposition';

function SetupPanel({ availableShips, selectShip, currentlyPlacing, startTurn }) {
  return (
    <div>
      {availableShips.length > 0 ? (
        <ShipsDisposition
          availableShips={availableShips}
          selectShip={selectShip}
          currentlyPlacing={currentlyPlacing}
        />
      ) : (
        <GameStart 
          startTurn={startTurn}
        />
      )}
    </div>
  );
}

export default SetupPanel;
