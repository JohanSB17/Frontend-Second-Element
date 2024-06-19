import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  isVisible = new BehaviorSubject<boolean>(true);

  show() {
    this.isVisible.next(true);
  }

  hide() {
    this.isVisible.next(false);
  }
}
