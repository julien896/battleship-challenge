import { configureStore } from '@reduxjs/toolkit';
import player from './slices/playerSlice';
import gameState from './slices/gameStateSlice';

export default configureStore({
  reducer: {
    player,
    gameState
  }
});
