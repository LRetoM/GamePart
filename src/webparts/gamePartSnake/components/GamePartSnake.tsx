// Reihenfolge nach Policy 2.2.5.9: 1. Module 2. Default 3. Destructuring
import * as React from 'react';

import styles from './GamePartSnake.module.scss';

import { IGamePartSnakeProps } from './IGamePartSnakeProps';

// Policy 2.3.10.2: Keine React Class Components — nur Function Components
const GamePartSnakeComponent = (props: IGamePartSnakeProps): React.ReactElement => {
    return (
        <div className={styles.gamePartSnake}>
            <h2>GamePartSnake</h2>
            <p>Hallo, {props.UserDisplayName}!</p>
        </div>
    );
};

export default GamePartSnakeComponent;
