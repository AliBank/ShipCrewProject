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
  crewList: Crew[] = []; 
  displayedColumns: string[] = ['id', 'name', 'lastName', 'role', 'dailyRate', 'actions'];

  constructor(private crewService: CrewService) {}

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe((crew: Crew[]) => {
      this.crewList = crew;
    });
  }
}
