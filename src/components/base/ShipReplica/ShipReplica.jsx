import PropTypes from 'prop-types';
import React from 'react';
import './shipReplica.scss';

function ShipReplica({
  shipName,
  availableShips,
  selectShip,
  isCurrentlyPlacing
}) {
  const ship = availableShips.find((item) => item.name === shipName);
  const shipLength = new Array(ship.length).fill('ship');
  const allReplicaSquares = shipLength.map((item) => (
    <div className="small-square" key={item} />
  ));

  return (
    <div
      role="presentation"
      className={isCurrentlyPlacing ? 'replica placing' : 'replica'}
      onClick={() => selectShip(shipName)}
      key={`${shipName}`}
    >
      <div className="title">{shipName}</div>
      <div className="squares">{allReplicaSquares}</div>
    </div>
  );
}

ShipReplica.propTypes = {
  availableShips: PropTypes.shape({
    find: PropTypes.func
  }).isRequired,
  isCurrentlyPlacing: PropTypes.bool.isRequired,
  selectShip: PropTypes.func.isRequired,
  shipName: PropTypes.string.isRequired
};

export default ShipReplica;
