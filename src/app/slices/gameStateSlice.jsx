import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

export const gameStateSlice = createSlice({
  name: 'state',
  initialState: {
    gameState: 'placement'
  },
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload;
    }
  }
});

export const { setGameState } = gameStateSlice.actions;
export default gameStateSlice.reducer;
