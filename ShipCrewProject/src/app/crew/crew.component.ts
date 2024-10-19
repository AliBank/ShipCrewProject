import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CrewService } from '../services/crew.service';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using mat-button
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule if using mat-card
import { MatDialog } from '@angular/material/dialog';
import { CrewDetailPageComponent } from  '../crew-detail-page/crew-detail-page.component';

@Component({
  selector: 'crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit{
  title = 'ShipCrewProject';

  displayedColumns: string[] = [
    'actions',
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

  constructor(private crewService: CrewService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCrewList();
  }

  deleteCrewMember(id: number): void {
    this.crewService.deleteCrew(id).subscribe(success => {
      if (success) {
        this.getCrewList();
      }
    });
  }

  getCrewList() {
    this.crewService.getCrewList().subscribe((crewList: Crew[]) => {
      this.dataSource.data = crewList;
    });
  }

  openCrewDetail(id: number): void {
    this.router.navigate(['/crew', id]);
  }

  openDialog(crewId: number): void {
    const dialogRef = this.dialog.open(CrewDetailPageComponent, {
      data: { id: crewId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
