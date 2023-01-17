import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/module/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { MatchComponent } from '../match/match.component';
import { of } from 'rxjs';
import { PlayerComponent } from '../player/player.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule
      ],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickOpenDialogPlayerButton', () => {
    it('should open the dialog of PlayerComponent correctly', () => {
      const open_dialog_spy =
        spyOn(component.dialog, 'open')
          .and
          .returnValue({
            afterClosed: () => of(true)
          } as MatDialogRef<typeof component>);

      component.onClickOpenDialogPlayerButton();

      expect(open_dialog_spy).toHaveBeenCalledWith(PlayerComponent, {});
    });
  })

  describe('onClickOpenDialogMatchButton', () => {
    it('should open the dialog of MatchComponent correctly', () => {
      const openDialogSpy =
        spyOn(component.dialog, 'open')
          .and
          .returnValue({
            afterClosed: () => of(true)
          } as MatDialogRef<typeof component>);
      component.onClickOpenDialogMatchButton();

      expect(openDialogSpy).toHaveBeenCalledWith(MatchComponent, {});
    });
  })
});
