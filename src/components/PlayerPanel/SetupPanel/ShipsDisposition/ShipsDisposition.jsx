/* eslint-disable */
import React from 'react';
import ShipReplica from '../../../base/ShipReplica/ShipReplica';
import './shipsDisposition.scss';

function ShipsDisposition({ availableShips, selectShip, currentlyPlacing }) {
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

  return (
    <div className="replica-fleet">
      <span>Place your ships on the board.</span>
      {shipReplicaBoxes}
      <span className="player-tip">
        Right click to rotate <br />
        before you position.
      </span>
      <p className="restart">Restart</p>
    </div>
  );
}

export default ShipsDisposition;