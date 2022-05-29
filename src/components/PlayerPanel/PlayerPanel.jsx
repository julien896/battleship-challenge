/* eslint-disable */
import React from 'react';
import ShipReplica from '../base/ShipReplica/ShipReplica';
import GameStart from './GameStart/GameStart';
import './playerPanel.scss';

function PlayerPanel({ availableShips, selectShip, currentlyPlacing }) {
  const shipsLeft = availableShips.map((ship) => ship.name);

  /*  For every ship still available, return a Replica Box */
  const shipReplicaBoxes = shipsLeft.map((shipName) => (
    <ShipReplica
      key={shipName}
      shipName={shipName}
      isCurrentlyPlacing={
        currentlyPlacing && currentlyPlacing.name === shipName
      }
      selectShip={selectShip}
      availableShips={availableShips}
    />
  ));

  // TODO: Put the comments of game state and the fleet to be placed
  const fleet = (
    <div className="replica-fleet">
      {shipReplicaBoxes}
      <span className="player-tip">Right click to rotate <br/>before you position.</span>
      <p className="restart">Restart</p>
    </div>
  );

  return ( 
  <div>
      {availableShips.length > 0 ? fleet : <GameStart />}
  </div>
  );
}

export default PlayerPanel;
