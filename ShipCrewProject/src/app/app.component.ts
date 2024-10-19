import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CrewService } from './services/crew.service';
import { Crew } from './models/crew.model';
import { Certificate } from './models/certificate.model';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using mat-button
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule if using mat-card
import { MatDialog } from '@angular/material/dialog';
import { CrewDetailPageComponent } from  './crew-detail-page/crew-detail-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ShipCrewProject';

  constructor(private crewService: CrewService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void { 
  }

}
