import { WebPartContext } from '@microsoft/sp-webpart-base';

export class CommonsState{

    public Context: WebPartContext;
    public IsInitialLoading: boolean;
    public HasAppError: boolean;

    constructor(){
        this.Context = undefined;
        this.IsInitialLoading = true;
        this.HasAppError = false;
    }
}