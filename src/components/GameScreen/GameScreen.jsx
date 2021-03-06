import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameState } from '../../app/slices/gameStateSlice';
import { savePlayerName } from '../../app/slices/playerSlice';
import CpuBoard from '../CpuBoard/CpuBoard';
import PlayerBoard from '../PlayerBoard/PlayerBoard';
import PlayerPanel from '../PlayerPanel';
import AVAILABLE_SHIPS from '../../constants/game';
import {
  placeAllCpuShips,
  updateSunkShips,
  coordsToIndex,
  indexToCoords,
  generateEmptyLayout,
  putEntityInLayout,
  SQUARE_STATE,
  generateRandomIndex,
  getNeighbors
} from '../../constants/layout';
import './gameScreen.scss';

function GameScreen() {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameState.gameState);

  const [winner, setWinner] = useState(null);
  const [availableShips, setAvailableShips] = useState(AVAILABLE_SHIPS);

  const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
  const [placedShips, setPlacedShips] = useState([]);
  const [cpuShips, setCpuShips] = useState([]);

  const [hitsByPlayer, setHitsByPlayer] = useState([]);
  const [hitsByComputer, setHitsByComputer] = useState([]);

  const [surrender, setSurrender] = useState(false);

  // *** PLAYER ***
  const selectShip = (shipName) => {
    const shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
    const shipToPlace = availableShips[shipIdx];

    setCurrentlyPlacing({
      ...shipToPlace,
      orientation: 'horizontal',
      position: null
    });
  };

  const placeShip = (currently) => {
    setPlacedShips([
      ...placedShips,
      {
        ...currently,
        placed: true
      }
    ]);

    setAvailableShips((previousShips) =>
      previousShips.filter((ship) => ship.name !== currently.name)
    );

    setCurrentlyPlacing(null);
  };

  const rotateShip = (event) => {
    if (currentlyPlacing != null && event.button === 2) {
      setCurrentlyPlacing({
        ...currentlyPlacing,
        orientation:
          currentlyPlacing.orientation === 'vertical'
            ? 'horizontal'
            : 'vertical'
      });
    }
  };

  const changeTurn = () => {
    if (gameState === 'player-turn') {
      dispatch(setGameState('cpu-turn'));
    } else {
      dispatch(setGameState('player-turn'));
    }
  };

  // Check if either player or computer ended the game
  const checkIfGameOver = () => {
    const successfulPlayerHits = hitsByPlayer.filter(
      (hit) => hit.type === 'hit'
    ).length;
    const successfulCpuHits = hitsByComputer.filter(
      (hit) => hit.type === 'hit'
    ).length;

    if (successfulCpuHits === 16 || successfulPlayerHits === 16 || surrender) {
      dispatch(setGameState('game-over'));

      if (successfulCpuHits === 16 || surrender) {
        setWinner('cpu');
      }
      if (successfulPlayerHits === 16) {
        setWinner('player');
      }

      return true;
    }

    return false;
  };

  // *** CPU ***
  const generateCpuShips = () => {
    const placedCpuShips = placeAllCpuShips(AVAILABLE_SHIPS.slice());
    setCpuShips(placedCpuShips);
  };

  const cpuFire = (index, layout) => {
    let cpuHits;

    if (layout[index] === 'ship') {
      cpuHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.hit
        }
      ];
    }
    if (layout[index] === 'empty') {
      cpuHits = [
        ...hitsByComputer,
        {
          position: indexToCoords(index),
          type: SQUARE_STATE.miss
        }
      ];
    }
    const sunkShips = updateSunkShips(cpuHits, placedShips);
    setPlacedShips(sunkShips);
    setHitsByComputer(cpuHits);
  };

  // Change to computer turn, check if game over and stop if yes; if not fire into an eligible square
  const handleCpuTurn = () => {
    changeTurn();

    if (checkIfGameOver()) {
      return;
    }

    // Recreate layout to get eligible squares
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

    const successfulCpuHits = hitsByComputer.filter(
      (hit) => hit.type === 'hit'
    );

    const nonSunkCpuHits = successfulCpuHits.filter((hit) => {
      const hitIndex = coordsToIndex(hit.position);
      return layout[hitIndex] === 'hit';
    });

    let potentialTargets = nonSunkCpuHits
      .flatMap((hit) => getNeighbors(hit.position))
      .filter((idx) => layout[idx] === 'empty' || layout[idx] === 'ship');

    if (potentialTargets.length === 0) {
      const layoutIndices = layout.map((item, idx) => idx);
      potentialTargets = layoutIndices.filter(
        (index) => layout[index] === 'ship' || layout[index] === 'empty'
      );
    }

    const randomIndex = generateRandomIndex(potentialTargets.length);

    const target = potentialTargets[randomIndex];

    setTimeout(() => {
      cpuFire(target, layout);
      dispatch(setGameState('player-turn'));
    }, 700);
  };

  /* GAME END
   *  ????????????????????????????????????????????????????????????????????????????????????????????????????????? */

  const startAgain = () => {
    dispatch(setGameState('placement'));
    dispatch(savePlayerName(''));
    setWinner(null);
    setSurrender(false);
    setCurrentlyPlacing(null);
    setPlacedShips([]);
    setAvailableShips(AVAILABLE_SHIPS);
    setCpuShips([]);
    setHitsByPlayer([]);
    setHitsByComputer([]);
  };
  return (
    <div className="game-screen">
      <PlayerPanel
        availableShips={availableShips}
        selectShip={selectShip}
        currentlyPlacing={currentlyPlacing}
        generateCpuShips={generateCpuShips}
        surrender={surrender}
        setSurrender={setSurrender}
        winner={winner}
        startAgain={startAgain}
        hitsByComputer={hitsByComputer}
        hitsByPlayer={hitsByPlayer}
      />
      <PlayerBoard
        placeShip={placeShip}
        placedShips={placedShips}
        currentlyPlacing={currentlyPlacing}
        setCurrentlyPlacing={setCurrentlyPlacing}
        rotateShip={rotateShip}
        hitsByComputer={hitsByComputer}
      />
      <CpuBoard
        cpuShips={cpuShips}
        setCpuShips={setCpuShips}
        hitsByPlayer={hitsByPlayer}
        setHitsByPlayer={setHitsByPlayer}
        handleCpuTurn={handleCpuTurn}
        checkIfGameOver={checkIfGameOver}
      />
    </div>
  );
}

export default GameScreen;
