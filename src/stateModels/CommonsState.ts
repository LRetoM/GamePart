export class CommonsState{

    public Context: any;
    public IsInitialLoading: boolean;
    public HasAppError: boolean;

    constructor(){
        this.Context = undefined;
        this.IsInitialLoading = true;
        this.HasAppError = false;
    }
}