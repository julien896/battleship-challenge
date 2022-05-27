import { configureStore } from '@reduxjs/toolkit';
import player from './slices/playerSlice';

export default configureStore({
  reducer: {
    player
  }
});
