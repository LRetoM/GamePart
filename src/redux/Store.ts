import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import RootReducer from './reducers/RootReducer';

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
