import { CommonsState } from "../../stateModels/CommonsState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGameSnakeComponentProperties } from "../../webparts/gameSnake/IGameSnakeComponentProperties";

const commonsSlice = createSlice({
    name: 'commons',
    initialState: new CommonsState(),
    reducers: {
        LOADING_COMMONS(state: CommonsState, action: PayloadAction<IGameSnakeComponentProperties>){
            return {
                ...state, 
                Context:action.payload.Context,
                IsInitialLoading: true, 
                HasAppError: action.payload.Context === undefined
            };
        },
        LOADING_COMMONS_DONE(state: CommonsState){
            return {...state, IsInitialLoading: false};
        },
        ENABLE_ERROR(state: CommonsState){
            return {...state, HasAppError: true};
        }
    }
});

export default commonsSlice;
export const {LOADING_COMMONS, LOADING_COMMONS_DONE, ENABLE_ERROR} = commonsSlice.actions;