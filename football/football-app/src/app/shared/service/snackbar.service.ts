import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarServiceInterface } from './snackbar.service.interface';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService implements SnackbarServiceInterface {

    constructor(
        private snackBar: MatSnackBar
    ) { }

    public open(content: string, action: string, duration: number): void {
        try {
            this.snackBar.open(
                content,
                action,
                { duration: duration }
            );
        } catch (e) {
            throw e;
        }

    }


}
