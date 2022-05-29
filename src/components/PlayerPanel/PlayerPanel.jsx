/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ShipReplica from '../base/ShipReplica/ShipReplica';
import { savePlayerName } from '../../app/slices/playerSlice';
import './playerPanel.scss';

function PlayerPanel({ availableShips, selectShip, currentlyPlacing }) {
  const [playerName, setPlayerName] = useState('');
  const dispatch = useDispatch();

  const shipsLeft = availableShips.map((ship) => ship.name);

  /*  For every ship still available, return a Replica Box */
  const shipReplicaBoxes = shipsLeft.map((shipName) => (
    <ShipReplica
      key={shipName}
      shipName={shipName}
      currentlyPlacing={currentlyPlacing}
      selectShip={selectShip}
      availableShips={availableShips}
    />
  ));

  // TODO: Put the comments of game state and the fleet to be placed
  const fleet = (
    <div className="replica-fleet">
      {shipReplicaBoxes}
      <p className="restart">Restart</p>
    </div>
  );

  // TODO: Create the reducer of player name
  const playButton = (
    <div id="play-ready">
      <p className="player-tip">Please, enter your name to begin.</p>
      <input
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onBlur={() => dispatch(savePlayerName(playerName))}
        placeholder="Player name"
      />
      <button
        disabled={playerName === ''}
        className="play-button"
        type="button"
      >
        Start game
      </button>
    </div>
  );

  return (
  <div>
      {fleet}
  </div>
  );
}

export default PlayerPanel;
