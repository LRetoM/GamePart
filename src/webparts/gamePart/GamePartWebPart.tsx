import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Provider } from 'react-redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { AppDispatch, RootState } from '../../redux/Store';
import { GamePartComponent } from './components/GamePartComponent';
import { IGamePartComponentProperties } from './IGamePartComponentProperties';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default class GamePartWebPart extends BaseClientSideWebPart<Record<string, never>> {
  protected async onInit(): Promise<void> {
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGamePartComponentProperties> = React.createElement(
      GamePartComponent,
      { Context: this.context }
    );
    ReactDom.render(<Provider store={store}>{element}</Provider>, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
