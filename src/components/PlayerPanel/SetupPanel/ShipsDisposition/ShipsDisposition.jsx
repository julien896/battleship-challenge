import PropTypes from 'prop-types';
import React from 'react';
import ShipReplica from '../../../base/ShipReplica/ShipReplica';
import './shipsDisposition.scss';

function ShipsDisposition({
  availableShips,
  selectShip,
  currentlyPlacing,
  startAgain
}) {
  const shipsLeft = availableShips.map((ship) => ship.name);

  /*  For every ship still available, return a Replica Box of the ship, 
  with it's name and it's length representation by color squares */
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
      <span className="indication">
        Place your ships
        <br /> on the board.
      </span>
      {shipReplicaBoxes}
      <span className="player-tip">
        Right click to rotate <br />
        before you position.
      </span>
      <button type="button" className="restart" onClick={startAgain}>
        Restart
      </button>
    </div>
  );
}

ShipsDisposition.propTypes = {
  availableShips: PropTypes.shape({
    map: PropTypes.func
  }).isRequired,
  currentlyPlacing: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  selectShip: PropTypes.func.isRequired,
  startAgain: PropTypes.func.isRequired
};

export default ShipsDisposition;
