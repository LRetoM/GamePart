import * as React from 'react';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { IGamePartComponentProperties } from '../IGamePartComponentProperties';
import { SnakeGameComponent } from './SnakeGameComponent';
import styles from './GamePart.module.scss';

// Logging beim Laden des Moduls -> sichtbar, sobald das Bundle ausgefuehrt wird.
console.log('[GamePart] GamePartComponent-Modul geladen');

export const GamePartComponent: React.FunctionComponent<IGamePartComponentProperties> = (_properties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  React.useEffect(() => {
    console.log('[GamePart] GamePartComponent gemountet -> LOADING_COMMONS_DONE');
    dispatch(LOADING_COMMONS_DONE());
  }, []);

  if (commonsState.HasAppError) {
    return <MessageBar messageBarType={MessageBarType.error}>Ein Fehler ist aufgetreten.</MessageBar>;
  }

  if (commonsState.IsInitialLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <section className={styles.gamePart}>
      <h2 className={styles.title}>Snake</h2>
      <SnakeGameComponent />
    </section>
  );
};
