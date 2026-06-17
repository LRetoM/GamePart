// Reihenfolge nach Policy 2.2.5.9: 1. Module 2. Default 3. Destructuring
import * as React from 'react';
import * as ReactDom from 'react-dom';

import {GamePartSnakeComponent} from './components/GamePartSnake';

import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IGamePartSnakeComponentProperties } from './components/IGamePartSnakeComponentProperties';

export default class GamePartSnakeWebPart extends BaseClientSideWebPart<Record<string, never>> {

    protected async onInit(): Promise<void> {
        return super.onInit();
    }

    public render(): void {
        const element: React.ReactElement<IGamePartSnakeComponentProperties> = React.createElement(
            GamePartSnakeComponent,
            {
               Context: this.context
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }
}
