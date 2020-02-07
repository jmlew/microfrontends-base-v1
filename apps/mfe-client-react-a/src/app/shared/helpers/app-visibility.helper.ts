export class AppVisibilityHelper {
  private isAppHidden: boolean;

  get isHidden(): boolean {
    return this.isAppHidden;
  }

  set isHidden(isHidden: boolean) {
    this.isAppHidden = isHidden;
  }
}

const appVisibility: AppVisibilityHelper = new AppVisibilityHelper();

export { appVisibility };
