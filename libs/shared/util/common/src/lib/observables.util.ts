import { Subject } from 'rxjs';

export function destroy(subject: Subject<unknown>) {
  if (subject) {
    subject.next();
    subject.complete();
  }
}
