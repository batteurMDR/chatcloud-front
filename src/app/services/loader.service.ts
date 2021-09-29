import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    public loader$ = new BehaviorSubject<boolean>(true);

    constructor() {}

    public showLoader(): void {
        this.loader$.next(true);
    }

    public hideLoader(): void {
        this.loader$.next(false);
    }
}
