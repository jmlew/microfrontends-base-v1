import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { AppInterfaceFacadeService } from '../../../../core/services';

@Component({
  selector: 'app-comm-from-apps',
  templateUrl: './comm-from-apps.component.html',
})
export class CommFromAppsComponent {
  appMessage$: Observable<OrangeAppMessage>;

  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    this.appMessage$ = this.appInterface.appMessage$;
  }
}
