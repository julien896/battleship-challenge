import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    name: ''
  },
  reducers: {
    savePlayerName: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { savePlayerName } = playerSlice.actions;
export default playerSlice.reducer;
