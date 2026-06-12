import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Provider } from 'react-redux';
import store from '../../redux/Store';
import { GamePartComponent } from './components/GamePartComponent';
import { IGamePartComponentProperties } from './IGamePartComponentProperties';

export default class GamePartWebPart extends BaseClientSideWebPart<Record<string, never>> {
  protected async onInit(): Promise<void> {
    console.log('[GamePart] onInit start');
    try {
      const result = await super.onInit();
      console.log('[GamePart] onInit done');
      return result;
    } catch (error) {
      console.error('[GamePart] onInit error:', error);
      throw error;
    }
  }

  public render(): void {
    console.log('[GamePart] render start');
    try {
      const element: React.ReactElement<IGamePartComponentProperties> = React.createElement(
        GamePartComponent,
        { Context: this.context }
      );
      ReactDom.render(<Provider store={store}>{element}</Provider>, this.domElement);
      console.log('[GamePart] render done');
    } catch (error) {
      console.error('[GamePart] render error:', error);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
