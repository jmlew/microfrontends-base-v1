import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ClientApp, OrangeAppMessage } from '@microfr/shared/model/app-interface';

@Component({
  selector: 'app-comm-to-app-form',
  templateUrl: './comm-to-app-form.component.html',
  styleUrls: ['./comm-to-app-form.component.scss'],
})
export class FooACommToAppFormComponent implements OnInit {
  @Output() sendMessage = new EventEmitter<OrangeAppMessage>();

  message: FormControl = new FormControl(null);

  constructor() {}

  ngOnInit() {}

  onSendMessage(message: string) {
    const data: OrangeAppMessage = {
      fromApp: ClientApp.Red,
      toApp: ClientApp.Orange,
      message,
    };
    this.sendMessage.emit(data);
  }
}
