import * as React from 'react';
import styles from './GamePartSnake.module.scss';
import { IGamePartSnakeComponentProperties } from './IGamePartSnakeComponentProperties';

export const GamePartSnakeComponent = React.FunctionComponent <IGamePartSnakeComponentProperties> = () => {
    return (
        <div className={styles.gamePartSnake}>
            <h2>GamePartSnake</h2>
            <p>Hallo, {props.UserDisplayName}!</p>
        </div>
    );
};

