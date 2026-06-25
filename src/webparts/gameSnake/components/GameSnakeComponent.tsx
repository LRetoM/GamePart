import * as React from 'react';
import styles from './GameSnake.module.scss';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { IGameSnakeComponentProperties } from '../IGameSnakeComponentProperties';
import { useAppDispatch, useAppSelector } from '../GameSnakeWebPart';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS, LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { GameState } from '../../../stateModels/GameState';
import { MenuComponent } from './menuComponent/MenuComponent';
import { GameComponent } from './gameComponent/GameComponent';
import { GameOverComponent } from './gameOverComponent/GameOverComponent';

export const GameSnakeComponent: React.FunctionComponent <IGameSnakeComponentProperties> = (properties) => {
    const dispatch = useAppDispatch();
    const commonsState: CommonsState = useAppSelector(state => state.commonsState);
    const gameState: GameState = useAppSelector(state => state.gameState);

    React.useEffect(() => {
        dispatch(LOADING_COMMONS(properties))
    }, []);

    React.useEffect(() => {
        if(commonsState.Context === undefined) return;
        dispatch(LOADING_COMMONS_DONE())
    }, [commonsState.Context])

    if(commonsState.HasAppError) {
        return (
            <section>
                <MessageBar messageBarType={MessageBarType.error}>
                    Ein Fehler ist aufgetreten.
                </MessageBar>
            </section>
        );
    }

    if(commonsState.IsInitialLoading) {
        return (
            <section>
                <Spinner size={SpinnerSize.large}/>
            </section>
        );
    }


    return (
        <section className={styles.gameSnake}>
            <div>
                {gameState.GameStatus === "IDLE" && <MenuComponent />}
                {gameState.GameStatus === "READY" || gameState.GameStatus === "RUNNING" && <GameComponent />}
                {gameState.GameStatus === "GAME_OVER" && <GameOverComponent />}
            </div>
        </section>
    )
};

