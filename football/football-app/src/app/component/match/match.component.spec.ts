import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/module/shared.module';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { MatchDeleteComponent } from './match-delete/match-delete.component';
import { MatchComponent } from './match.component';


describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;
  let snackbarService: SnackbarService;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [MatchComponent],
      providers: [SnackbarService]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    snackbarService = TestBed.inject(SnackbarService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickOpenDialogDeleteMatchButton', () => {
    it('should open the dialog of MatchDeleteComponent correctly', () => {
      const open_dialog_spy =
        spyOn(component.dialog, 'open')
          .and
          .returnValue({
            afterClosed: () => of(true)
          } as MatDialogRef<typeof component>);

      component.onClickOpenDialogDeleteMatchButton();

      expect(open_dialog_spy).toHaveBeenCalledWith(MatchDeleteComponent, {});
    });
  })

  describe('onClickSaveMatchButton', () => {
    it('it should open the snackbar after the http call is finished', () => {
      const open_snackbar_spy = spyOn(snackbarService, 'open');
      let match_slug = 'test'
      component.onClickSaveMatchButton();

      httpClient.post(`http://localhost:3000/match/${match_slug}`, {}).subscribe(() => {
        httpMock.verify();
        expect(open_snackbar_spy).toHaveBeenCalledWith(`Match ${match_slug} saved correctly`, 'Close', 2000);
      })

    })
  })

  describe('onClickUpdateMatchButton', () => {
    it('it should open the snackbar after the http call is finished', () => {
      const open_snackbar_spy = spyOn(snackbarService, 'open');
      let match_slug = 'test'

      httpClient.patch(`http://localhost:3000/match/${match_slug}`, {}).subscribe(() => {
        httpMock.verify();
        expect(open_snackbar_spy).toHaveBeenCalledWith(`Match ${match_slug} updated correctly`, 'Close', 2000);
      })
    })
  })
});
