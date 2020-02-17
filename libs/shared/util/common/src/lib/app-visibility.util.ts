export class AppVisibility {
  private isAppHidden = false;

  get isHidden(): boolean {
    return this.isAppHidden;
  }

  set isHidden(isHidden: boolean) {
    this.isAppHidden = isHidden;
  }
}
