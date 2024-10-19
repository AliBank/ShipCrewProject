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
import { CrewDetailPageComponent } from '../crew-detail-page/crew-detail-page.component';
import { CrewAddComponent } from '../crew-add/crew-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
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

  constructor(private crewService: CrewService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  /*   getCrewList(): void {
      this.crewService.getCrewList().subscribe((list) => {
        this.crewList = list; // Update local list
        this.dataSource.data = crewList;
      });
    } */

  openCrewDetail(id: number): void {
    this.router.navigate(['/crew', id]);
  }

  openAddCrewDialog(): void {
    const dialogRef = this.dialog.open(CrewAddComponent, {
      width: '90vw',  // 90% of the viewport width
      height: '90vh', // 90% of the viewport height
      maxWidth: '100vw', // Prevent any default max width constraint
      maxHeight: '100vh', // Prevent height constraint
      data: {}, // Pass data if needed
      panelClass: 'custom-dialog-container', // Optional custom styling
    });

    dialogRef.afterClosed().subscribe((newCrew: Crew) => {
      if (newCrew) {
        // Add the new crew to the list using the service
        this.crewService.addCrew(newCrew).subscribe(result => {
          this.snackBar.open('Crew added successfully!', 'Close', {
            duration: 3000,
          });

          // Refresh the crew list (if necessary)
          this.getCrewList();
        }, error => {});
      }
    });
  }

}
