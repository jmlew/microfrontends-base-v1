import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppVisibilityService {
  private isAppHidden: boolean;

  get isHidden(): boolean {
    return this.isAppHidden;
  }

  set isHidden(isHidden: boolean) {
    this.isAppHidden = isHidden;
  }
}
