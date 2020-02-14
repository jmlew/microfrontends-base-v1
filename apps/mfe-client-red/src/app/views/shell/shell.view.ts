import { Component, OnInit } from '@angular/core';

/**
 * Shell component defines the top-level app structure. This markup is often defined in
 * the app-root component, but is instead placed into a separate view to allow for the
 * app's contents to be 'destroyed' on given routes when used within a micro-frontends
 * architecture.
 */
@Component({
  templateUrl: './shell.view.html',
  styleUrls: ['./shell.view.scss'],
})
export class ShellView implements OnInit {
  ngOnInit() {}
}
