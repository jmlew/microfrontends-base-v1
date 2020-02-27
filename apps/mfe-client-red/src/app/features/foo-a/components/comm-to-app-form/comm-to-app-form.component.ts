import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comm-to-app-form',
  templateUrl: './comm-to-app-form.component.html',
  styleUrls: ['./comm-to-app-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooACommToAppFormComponent implements OnInit {
  @Output() sendMessage = new EventEmitter<string>();

  message: FormControl = new FormControl(null);

  constructor() {}

  ngOnInit() {}

  onSendMessage(message: string) {
    this.sendMessage.emit(message);
  }
}
