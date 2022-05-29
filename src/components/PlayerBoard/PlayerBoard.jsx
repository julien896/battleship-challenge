/* eslint-disable */
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
  rotateShip
}) {

  const playerName = useSelector(state => state.player.name)

  let layout = placedShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
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
      onClick={() => {
        if (canPlaceCurrentShip) {
          placeShip(currentlyPlacing);
        }
      }}
      className={`square ${stateToClassName[square]}`}
      id={`square-${index}`}
      onContextMenu={(e)=> e.preventDefault()}
      onMouseDown={rotateShip}
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

export default PlayerBoard;
