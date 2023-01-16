import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchComponent } from './component/match/match.component';
import { SharedModule } from './module/shared.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatchDeleteComponent } from './component/match/match-delete/match-delete.component';
import { PlayerUpdateComponent } from './component/player/player-update/player-update.component';
import { PlayerComponent } from './component/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    MatchComponent,
    DashboardComponent,
    MatchDeleteComponent,
    PlayerUpdateComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
