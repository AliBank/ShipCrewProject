import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CrewService } from './services/crew.service';
import { Crew } from './models/crew.model';
import { Certificate } from './models/certificate.model';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using mat-button
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule if using mat-card

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ShipCrewProject';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome'
  ];
  dataSource = new MatTableDataSource<Crew>();

  constructor(private crewService: CrewService) {}

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe((crewList: Crew[]) => {
      this.dataSource.data = crewList;
    });
  }
}
