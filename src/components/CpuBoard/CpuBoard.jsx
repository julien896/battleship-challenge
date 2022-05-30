/* eslint-disable */
import React from 'react';
import {
  generateEmptyLayout,
  stateToClassName,
  SQUARE_STATE,
  putEntityInLayout,
  indexToCoords
} from '../../constants/layout';
import '../../styles/base/board.scss';

function CpuBoard({ cpuShips, hitsByPlayer, setHitsByPlayer }) {
  let cpuLayout = cpuShips.reduce(
    (prevLayout, currentShip) =>
      putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
    generateEmptyLayout()
  );

  cpuLayout = hitsByPlayer.reduce(
    (prevLayout, currentHit) =>
      putEntityInLayout(prevLayout, currentHit, currentHit.type),
    cpuLayout
  );

  cpuLayout = cpuShips.reduce(
    (prevLayout, currentShip) =>
      currentShip.sunk
        ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
        : prevLayout,
    cpuLayout
  );

  const playerFire = (index) => {
    if (cpuLayout[index] === 'ship') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit
        }
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
    if (cpuLayout[index] === 'empty') {
      const newHits = [
        ...hitsByPlayer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss
        }
      ];
      setHitsByPlayer(newHits);
      return newHits;
    }
  };

  console.log(hitsByPlayer);

  const cpuSquares = cpuLayout.map((square, index) => (
    <div
      className={
        stateToClassName[square] === 'hit' ||
        stateToClassName[square] === 'miss' ||
        stateToClassName[square] === 'ship-sunk'
          ? `square ${stateToClassName[square]}`
          : `square`
      }
      id={`comp-square-${index}`}
      onClick={() => playerFire(index)}
    />
  ));
  return (
    <div className="board-container">
      <h2 className="player-name">CPU</h2>
      <div className="board">{cpuSquares}</div>
    </div>
  );
}

export default CpuBoard;
