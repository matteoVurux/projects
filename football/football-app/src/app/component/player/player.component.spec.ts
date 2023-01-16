import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/module/shared.module';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { PlayerUpdateComponent } from './player-update/player-update.component';
import { PlayerComponent } from './player.component';

let snackBar: MatSnackBar

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let snackbarService: SnackbarService = new SnackbarService(snackBar);

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [PlayerComponent]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickOpenDialogUpdatePlayerButton', () => {
    it('should open the dialog of PlayerUpdateComponent correctly', () => {
      const open_dialog_spy =
        spyOn(component.dialog, 'open')
          .and
          .returnValue({
            afterClosed: () => of(true)
          } as MatDialogRef<typeof component>);
      component.onClickOpenDialogUpdatePlayerButton();

      expect(open_dialog_spy).toHaveBeenCalledWith(PlayerUpdateComponent, {});
    });
  })

  describe('onClickSavePlayerButton', () => {
    it('should open the snackbar after the http call is finished', () => {
      const open_snackbar_spy = spyOn(snackbarService, 'open');
      let player_name = 'Marco'

      httpClient.post(`http://localhost:3000/player/${player_name}`, player_name).subscribe(() => {
        httpMock.verify();
        expect(open_snackbar_spy).toHaveBeenCalledWith(`Player ${player_name} saved correctly`, 'Close', 2000);
      })
    });
  })

  describe('onClickDeletePlayerButton', () => {
    it('should open the snackbar after the http call is finished', () => {
      const open_snackbar_spy = spyOn(snackbarService, 'open');
      let player_name = 'Marco'

      httpClient.delete(`http://localhost:3000/player/${player_name}`).subscribe(() => {
        httpMock.verify();
        expect(open_snackbar_spy).toHaveBeenCalledWith(`Player ${player_name} removed correctly`, 'Close', 2000);
      })
    });
  })
});
