import { createSlice } from '@reduxjs/toolkit';
import { CommonsState } from '../../stateModels/CommonsState';

const commonsSlice = createSlice({
  name: 'commons',
  initialState: new CommonsState(),
  reducers: {
    LOADING_COMMONS_DONE(state) {
      state.IsInitialLoading = false;
    },
    ENABLE_ERROR(state) {
      state.HasAppError = true;
    }
  }
});

export default commonsSlice;
export const { LOADING_COMMONS_DONE, ENABLE_ERROR } = commonsSlice.actions;
