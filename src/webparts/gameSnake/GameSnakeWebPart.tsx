// Reihenfolge nach Policy 2.2.5.9: 1. Module 2. Default 3. Destructuring
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {GameSnakeComponent} from './components/GameSnakeComponent';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IGameSnakeComponentProperties } from './IGameSnakeComponentProperties';
import store, { RootState, AppDispatch } from '../../redux/Store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default class GameSnakeWebPart extends BaseClientSideWebPart<Record<string, never>> {

    protected async onInit(): Promise<void> {
        return super.onInit();
    }

    public render(): void {
        const element: React.ReactElement<IGameSnakeComponentProperties> = React.createElement(
            GameSnakeComponent,
            {
               Context: this.context
            }
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
