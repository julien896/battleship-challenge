import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

export const gameStateSlice = createSlice({
  name: 'state',
  initialState: {
    state: 'placement'
  },
  reducers: {
    setGameState: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { setGameState } = gameStateSlice.actions;
export default gameStateSlice.reducer;
