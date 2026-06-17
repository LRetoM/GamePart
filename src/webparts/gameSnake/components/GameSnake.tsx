import * as React from 'react';
import styles from './GameSnake.module.scss';
import { IGameSnakeComponentProperties } from './IGameSnakeComponentProperties';

export const GameSnakeComponent: React.FunctionComponent <IGameSnakeComponentProperties> = () => {
    return (
        <div className={styles.gameSnake}>
            <h2>GameSnake</h2>
        </div>
    );
};

