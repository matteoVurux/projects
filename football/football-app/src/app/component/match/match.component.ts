import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { MatchDeleteComponent } from './match-delete/match-delete.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  statusControl = new FormControl(null, Validators.required);

  redStrikerControl = new FormControl(null, Validators.required);
  redDefenderControl = new FormControl(null, Validators.required);

  blueStrikerControl = new FormControl(null, Validators.required);
  blueDefenderControl = new FormControl(null, Validators.required);

  status: string[] = [
    'Ongoing',
    'Ended'
  ]

  player: string[] = [];

  matchForm = new FormGroup({
    slug: new FormControl(null, Validators.required),
    status: this.statusControl,
    red_score: new FormControl(null, Validators.required),
    blue_score: new FormControl(null, Validators.required),
    red_striker: this.redStrikerControl,
    red_defender: this.redDefenderControl,
    blue_striker: this.blueStrikerControl,
    blue_defender: this.blueDefenderControl,
  });

  @ViewChild('matchFormDirective') private matchFormDirective!: NgForm;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  public onClickOpenDialogDeleteMatchButton(): void {
    const dialogRef = this.dialog.open(MatchDeleteComponent, {
    });
  }

  public onClickSaveMatchButton(): void {
    try {
      let req$ = this.http.post('http://localhost:3000/match',
        {
          slug: this.matchForm.value.slug,
          status: this.statusControl.value,
          red: {
            score: this.matchForm.value.red_score,
            formation: {
              striker: this.matchForm.value.red_striker,
              defender: this.matchForm.value.red_defender
            }
          },
          blue: {
            score: this.matchForm.value.blue_score,
            formation: {
              striker: this.matchForm.value.blue_striker,
              defender: this.matchForm.value.blue_defender
            }
          }
        }
      )

      req$.subscribe(
        {
          next: res => {
            this.snackBarService.open(`Match ${this.matchForm.value.slug} saved correctly`, 'Close', 5000)
            this.matchForm.reset();
            this.matchFormDirective.resetForm();
          },
          error: err => {
            this.snackBarService.open(`Error while saving match ${this.matchForm.value.slug}`, 'Close', 5000);
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

  public onClickUpdateMatchButton(): void {
    try {
      let req$ = this.http.patch(`http://localhost:3000/match/${this.matchForm.value.slug}`,
        {
          status: this.statusControl.value,
          red: {
            score: this.matchForm.value.red_score,
            formation: {
              striker: this.matchForm.value.red_striker,
              defender: this.matchForm.value.red_defender
            }
          },
          blue: {
            score: this.matchForm.value.blue_score,
            formation: {
              striker: this.matchForm.value.blue_striker,
              defender: this.matchForm.value.blue_defender
            }
          }
        }
      )

      req$.subscribe(
        {
          next: res => {
            this.snackBarService.open(`Match ${this.matchForm.value.slug} updated correctly`, 'Close', 5000);
            this.matchForm.reset();
            this.matchFormDirective.resetForm();
          },
          error: err => {
            this.snackBarService.open(`Error while updating match ${this.matchForm.value.slug}`, 'Close', 5000);
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
            this.matchForm.reset();
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
