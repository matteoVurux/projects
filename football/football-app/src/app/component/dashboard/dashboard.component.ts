import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, DoCheck, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatchComponent } from '../match/match.component';
import { PlayerComponent } from '../player/player.component';

interface MatchTableInterface {
  position: number;
  slug: string;
  status: string,
  team_red_points: number;
  team_red_striker: string;
  team_red_defender: string;
  team_blue_points: number;
  team_blue_striker: string;
  team_blue_defender: string;
}

interface PlayerInterface {
  name: string,
  points: number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, DoCheck {
  match_column: string[] = [
    'position',
    'slug',
    'status',
    'team_red_points',
    'team_red_striker',
    'team_red_defender',
    'team_blue_points',
    'team_blue_striker',
    'team_blue_defender'
  ];

  player_column: string[] = [
    'name',
    'points'
  ]

  matchDataSource = new MatTableDataSource<MatchTableInterface>();
  playerDataSource = new MatTableDataSource<PlayerInterface>();

  player: PlayerInterface[] = [];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  @ViewChild('MatchTableSort', { static: true }) tableOneSort!: MatSort;
  @ViewChild('PlayerTableSort', { static: true }) tableTwoSort!: MatSort;

  ngOnInit(): void {
    this.setMatchTableData();
    this.setPlayerTableData();
    this.matchDataSource.sort = this.tableOneSort;
    this.playerDataSource.sort = this.tableTwoSort;
  }

  ngAfterViewInit(): void {
    this.matchDataSource.sort = this.tableOneSort;
    this.playerDataSource.sort = this.tableTwoSort;
  }

  ngDoCheck(): void {
    this.matchDataSource.sort = this.tableOneSort;
    this.playerDataSource.sort = this.tableTwoSort;
  }

  public onClickOpenDialogPlayerButton(): void {
    const dialogRef = this.dialog.open(PlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setPlayerTableData();
    });
  }

  public onClickOpenDialogMatchButton(): void {
    const dialogRef = this.dialog.open(MatchComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.setMatchTableData();
      this.setPlayerTableData();
    });

  }

  /**
   * Set the match table with updated data
   */
  private setMatchTableData(): void {
    try {
      let req$ = this.http.get<any[]>('http://localhost:3000/match')

      let match_table_data: MatchTableInterface[] = [];

      req$.subscribe(
        {
          next: res => {
            res.forEach((el, index) => {
              match_table_data.push(
                {
                  position: index + 1,
                  slug: el.slug,
                  status: el.status,
                  team_red_points: el.red.score,
                  team_red_striker: el.red.formation.striker,
                  team_red_defender: el.red.formation.defender,
                  team_blue_points: el.blue.score,
                  team_blue_striker: el.blue.formation.striker,
                  team_blue_defender: el.blue.formation.defender,
                },
              )
            });

            this.matchDataSource = new MatTableDataSource(match_table_data);
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

  /**
   * Set the player table with updated data
   */
  private setPlayerTableData(): void {
    try {
      let req$ = this.http.get<any[]>('http://localhost:3000/player')

      let player_table_data: PlayerInterface[] = [];

      req$.subscribe(
        {
          next: res => {
            res.forEach((el, index) => {
              player_table_data.push(
                {
                  name: el.name,
                  points: el.points,
                }
              )
            });

            this.playerDataSource = new MatTableDataSource(player_table_data);
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
