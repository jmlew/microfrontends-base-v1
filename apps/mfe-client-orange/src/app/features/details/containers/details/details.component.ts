import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { AppInterfaceFacadeService } from '../../../../core/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class AppDetailsComponent {
  appMessage$: Observable<OrangeAppMessage>;

  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    this.appMessage$ = this.appInterface.appMessage$;
  }
}
