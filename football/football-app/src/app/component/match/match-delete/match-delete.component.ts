import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-match-delete',
  templateUrl: './match-delete.component.html',
  styleUrls: ['./match-delete.component.css']
})
export class MatchDeleteComponent implements OnInit {

  matchDeleteForm = new FormControl('');

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  public onClickDeleteMatchButton(): void {
    try {
      let req$ = this.http.delete(`http://localhost:3000/match/${this.matchDeleteForm.value}`);

      req$.subscribe(
        {
          next: res => {
            this.snackBarService.open(`Match ${this.matchDeleteForm.value} removed correctly`, 'Close', 2000);
            this.matchDeleteForm.reset();
          },
          error: err => {
            this.snackBarService.open(`Error while removing match ${this.matchDeleteForm.value}`, 'Close', 2000);
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

}
