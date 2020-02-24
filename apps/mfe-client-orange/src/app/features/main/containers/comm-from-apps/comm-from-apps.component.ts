import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { CommType, OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { AppInterfaceFacadeService } from '../../../../core/services';
import { AppCommState } from '../../services';

@Component({
  selector: 'app-comm-from-apps',
  templateUrl: './comm-from-apps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
