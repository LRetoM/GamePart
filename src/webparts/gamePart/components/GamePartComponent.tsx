import * as React from 'react';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { IGamePartComponentProperties } from '../IGamePartComponentProperties';
import styles from './GamePart.module.scss';

export const GamePartComponent: React.FunctionComponent<IGamePartComponentProperties> = (_properties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  React.useEffect(() => {
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
      {/* Spielkomponenten kommen hier */}
    </section>
  );
};
