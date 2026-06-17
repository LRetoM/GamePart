import * as React from 'react';
import styles from './GamePartSnake.module.scss';
import { IGamePartSnakeProps } from './IGamePartSnakeProps';

const GamePartSnakeComponent = (props: IGamePartSnakeProps): React.ReactElement => {
    return (
        <div className={styles.gamePartSnake}>
            <h2>GamePartSnake</h2>
            <p>Hallo, {props.UserDisplayName}!</p>
        </div>
    );
};

export default GamePartSnakeComponent;
