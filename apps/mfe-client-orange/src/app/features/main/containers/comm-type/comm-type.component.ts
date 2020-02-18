import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OrangeAppMessage } from '@microfr/shared/model/app-interface';
import { AppInterfaceFacadeService } from '../../../../core/services';

@Component({
  selector: 'app-comm-type',
  templateUrl: './comm-type.component.html',
})
export class CommTypeComponent {
  appMessage$: Observable<OrangeAppMessage>;

  constructor(private readonly appInterface: AppInterfaceFacadeService) {
    this.appMessage$ = this.appInterface.appMessage$;
  }
}
