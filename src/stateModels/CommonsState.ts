export class CommonsState {
  public IsInitialLoading: boolean;
  public HasAppError: boolean;

  constructor() {
    this.IsInitialLoading = true;
    this.HasAppError = false;
  }
}
