import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { PlayerUpdateComponent } from './player-update/player-update.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  playerForm = new FormControl(null, Validators.required);

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  public onClickSavePlayerButton(): void {
    try {
      let req$ = this.http.post('http://localhost:3000/player', { name: this.playerForm.value });

      req$.subscribe(
        {
          next: res => {
            this.snackBarService.open(`Player ${this.playerForm.value} saved correctly`, 'Close', 2000);
            this.playerForm.reset();
          },
          error: err => {
            this.snackBarService.open(`Error while saving player ${this.playerForm.value}`, 'Close', 2000);
            console.log('err', err)
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

  public onClickDeletePlayerButton(): void {
    try {
      let req$ = this.http.delete(`http://localhost:3000/player/${this.playerForm.value}`);

      req$.subscribe(
        {
          next: res => {
            this.snackBarService.open(`Player ${this.playerForm.value} removed correctly`, 'Close', 2000);
            this.playerForm.reset();
          },
          error: err => {
            this.snackBarService.open(`Error while removing player ${this.playerForm.value}`, 'Close', 2000);
            console.log('err', err)
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

  public onClickOpenDialogUpdatePlayerButton(): void {
    try {
      const dialogRef = this.dialog.open(PlayerUpdateComponent, {
      });

    } catch (e) {
      throw e;
    }
  }

}
