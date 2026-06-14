// Reihenfolge nach Policy 2.2.5.9: 1. Module 2. Default 3. Destructuring
import * as React from 'react';
import * as ReactDom from 'react-dom';

import GamePartSnakeComponent from './components/GamePartSnake';

import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IGamePartSnakeProps } from './components/IGamePartSnakeProps';

export default class GamePartSnakeWebPart extends BaseClientSideWebPart<Record<string, never>> {

    public render(): void {
        const element: React.ReactElement<IGamePartSnakeProps> = React.createElement(
            GamePartSnakeComponent,
            {
                UserDisplayName: this.context.pageContext.user.displayName
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
