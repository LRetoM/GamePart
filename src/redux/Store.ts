import rootReducer from "./reducers/RootReducer";
import { configureStore, Tuple } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";


const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(thunk)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;