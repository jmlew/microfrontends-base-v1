import { BehaviorSubject } from 'rxjs';

export interface MessageBusConfig {
  foo: string;
  bar: string;
}

export const messageBus: BehaviorSubject<MessageBusConfig> = new BehaviorSubject(null);
