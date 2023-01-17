import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-player-update',
  templateUrl: './player-update.component.html',
  styleUrls: ['./player-update.component.css']
})
export class PlayerUpdateComponent implements OnInit {

  nameControl = new FormControl(null, Validators.required);

  playerUpdateForm = new FormGroup({
    name: this.nameControl,
    name_update: new FormControl(null, Validators.required)
  });

  player: string[] = [];

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  public onClickUpdatePlayerButton(): void {
    try {
      let req$ = this.http.patch(`http://localhost:3000/player/${this.playerUpdateForm.value.name}`, { name: this.playerUpdateForm.value.name_update })

      req$.subscribe(
        {
          next: res => {
            this.snackBarService.open(`Player ${this.playerUpdateForm.value.name} updated correctly`, 'Close', 2000);
          },
          error: err => {
            this.snackBarService.open(`Error while updating player ${this.playerUpdateForm.value.name}`, 'Close', 2000);
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get all players available
   */
  private getAllPlayers(): void {
    try {
      let req$ = this.http.get<any[]>('http://localhost:3000/player')

      req$.subscribe(
        {
          next: res => {
            res.forEach(el => {
              this.player.push(el.name)
            });
          },
          error: err => {
            console.log('err', err)
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

}
