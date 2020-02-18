import { AppCommState } from './app-comm-state.service';
import { AppMenuStateService } from './app-menu-state.service';

export const exports: any[] = [AppCommState, AppMenuStateService];

export * from './app-comm-state.service';
export * from './app-menu-state.service';
