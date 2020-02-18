import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { AppInterfaceFacadeService } from '../../../../core/services';
import { CommType } from '../../enums/comm-type.enum';
import { AppCommState } from '../../services';

@Component({
  selector: 'app-comm-from-apps',
  templateUrl: './comm-from-apps.component.html',
})
export class CommFromAppsComponent {
  appMessage$: Observable<OrangeAppMessage>;
  commType$: Observable<CommType>;

  constructor(
    private readonly appInterface: AppInterfaceFacadeService,
    private readonly commState: AppCommState
  ) {
    this.appMessage$ = this.appInterface.appMessage$;
    this.commType$ = this.commState.commType$;
  }
}
