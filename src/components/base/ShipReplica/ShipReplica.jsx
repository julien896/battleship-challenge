/* eslint-disable */
import React from 'react';
import './shipReplica.scss';

function ShipReplica({ shipName, availableShips, selectShip, isCurrentlyPlacing }) {
  const ship = availableShips.find((item) => item.name === shipName);
  const shipLength = new Array(ship.length).fill('ship');
  const allReplicaSquares = shipLength.map((item, index) => (
    <div className="small-square" key={index} />
  ));

  return (
    <div 
      className={isCurrentlyPlacing ? 'replica placing' : 'replica'}
      onClick={() => selectShip(shipName)}
      key={`${shipName}`}
    >
      <div className="title">{shipName}</div>
      <div className="squares">{allReplicaSquares}</div>
    </div>
  );
}

export default ShipReplica;
