/* eslint-disable */
import React from 'react';

function ShipReplica({ shipName, availableShips }) {
  const ship = availableShips.find((item) => item.name === shipName);

  return (
    <div>
      <div className="replica-title">{shipName}</div>
    </div>
  );
}

export default ShipReplica;
