/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  generateEmptyLayout,
  stateToClassName,
  SQUARE_STATE,
  putEntityInLayout,
  indexToCoords,
  updateSunkShips
} from '../../constants/layout';
import '../../styles/base/board.scss';

function CpuBoard({
  cpuShips,
  hitsByPlayer,
  setHitsByPlayer,
  setCpuShips,
  handleCpuTurn,
  checkIfGameOver
}) {
  const gameState = useSelector((state) => state.gameState.gameState);

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

  const playerTurn = gameState === 'player-turn';
  const playerCanFire = playerTurn && !checkIfGameOver();

  const alreadyHit = (index) =>
    cpuLayout[index] === 'hit' ||
    cpuLayout[index] === 'miss' ||
    cpuLayout[index] === 'ship-sunk';

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
      onClick={() => {
        if (playerCanFire && !alreadyHit(index)) {
          const newHits = playerFire(index);
          const shipsWithSunkFlag = updateSunkShips(newHits, cpuShips);
          setCpuShips(shipsWithSunkFlag);
          handleCpuTurn();
        }
      }}
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
