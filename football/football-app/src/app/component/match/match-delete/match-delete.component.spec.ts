import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/module/shared.module';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';
import { MatchDeleteComponent } from './match-delete.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

let snackBar: MatSnackBar

describe('MatchDeleteComponent', () => {
  let component: MatchDeleteComponent;
  let fixture: ComponentFixture<MatchDeleteComponent>;
  let snackbarService: SnackbarService = new SnackbarService(snackBar);

  let httpMock: HttpTestingController;
  let httpClient: HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [MatchDeleteComponent],
      providers: [SnackbarService]
    })
      .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickDeleteMatchButton', () => {
    it('it should open the snackbar after the http call is finished', () => {
      const open_snackbar_spy = spyOn(snackbarService, 'open');

      let match_slug = 'test'

      httpClient.delete(`http://localhost:3000/match/${match_slug}`).subscribe(() => {
        httpMock.verify();
        expect(open_snackbar_spy).toHaveBeenCalledWith(`Match ${match_slug} removed correctly`, 'Close', 2000);
      })
    })
  })
});
