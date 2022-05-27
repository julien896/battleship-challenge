import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePlayerName } from '../../app/slices/playerSlice';

function PlayerPanel() {
  const [playerName, setPlayerName] = useState('');
  const dispatch = useDispatch();

  // TODO: Put the comments of game state and the fleet to be placed
  const fleet = (
    <div className="replica-fleet">
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
  console.log(playButton, fleet);

  return <div>Player panel</div>;
}

export default PlayerPanel;
