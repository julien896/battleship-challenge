import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  generateEmptyLayout,
  stateToClassName,
  putEntityInLayout,
  indexToCoords,
  calculateOverhang,
  canBePlaced,
  SQUARE_STATE
} from '../../constants/layout';
import '../../styles/base/board.scss';

function PlayerBoard({
  placeShip,
  placedShips,
  currentlyPlacing,
  setCurrentlyPlacing,
  rotateShip,
  hitsByComputer
}) {
  const playerName = useSelector((state) => state.player.name);

  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  layout = hitsByComputer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    layout
  );

  layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    layout
  );

  const isPlacingOverBoard =
    currentlyPlacing && currentlyPlacing.position != null;
  const canPlaceCurrentShip =
    isPlacingOverBoard && canBePlaced(currentlyPlacing, layout);

  if (isPlacingOverBoard) {
    if (canPlaceCurrentShip) {
      layout = putEntityInLayout(layout, currentlyPlacing, SQUARE_STATE.ship);
    } else {
      const forbiddenShip = {
        ...currentlyPlacing,
        length: currentlyPlacing.length - calculateOverhang(currentlyPlacing)
      };
      layout = putEntityInLayout(layout, forbiddenShip, SQUARE_STATE.forbidden);
    }
  }

  const squares = layout.map((square, index) => (
    <div
      role="presentation"
      onClick={() => {
        if (canPlaceCurrentShip) {
          placeShip(currentlyPlacing);
        }
      }}
      className={`square ${stateToClassName[square]}`}
      id={`square-${index}`}
      onContextMenu={(e) => e.preventDefault()}
      onMouseDown={rotateShip}
      onFocus={() => {}}
      onMouseOver={() => {
        if (currentlyPlacing) {
          setCurrentlyPlacing({
            ...currentlyPlacing,
            position: indexToCoords(index)
          });
        }
      }}
    />
  ));
  return (
    <div className="board-container">
      <h2 className="player-name">{playerName}</h2>
      <div className="board">{squares}</div>
    </div>
  );
}

PlayerBoard.propTypes = {
  currentlyPlacing: PropTypes.object.isRequired,
  hitsByComputer: PropTypes.array.isRequired,
  placeShip: PropTypes.func.isRequired,
  placedShips: PropTypes.shape({
    reduce: PropTypes.func
  }).isRequired,
  rotateShip: PropTypes.func.isRequired,
  setCurrentlyPlacing: PropTypes.func.isRequired
};

export default PlayerBoard;
