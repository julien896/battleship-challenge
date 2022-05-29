/* eslint-disable */
import React from 'react';
import './shipReplica.scss';

function ShipReplica({ shipName, availableShips }) {
  const ship = availableShips.find((item) => item.name === shipName);
  const shipLength = new Array(ship.length).fill('ship');
  const allReplicaSquares = shipLength.map((item, index) => (
    <div className="small-square" key={index} />
  ));

  return (
    <div className="replica">
      <div className="replica-title">{shipName}</div>
      <div className="replica-squares">{allReplicaSquares}</div>
    </div>
  );
}

export default ShipReplica;
