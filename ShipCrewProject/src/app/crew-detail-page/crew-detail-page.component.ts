import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CrewService } from '../services/crew.service';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using mat-button
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule if using mat-card
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'crew-detail-page',
  templateUrl: './crew-detail-page.component.html',
  styleUrl: './crew-detail-page.component.scss'
})
export class CrewDetailPageComponent implements OnInit {
  title = 'ShipCrewProject';
  rCrew: any;

  dataSource = new MatTableDataSource<Crew>();

  constructor(private crewService: CrewService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CrewDetailPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.crewService.getCrewById(data.id).subscribe(result => {
      if (result) {
        this.rCrew = result;
      }
    },
      error => { this.notify(error?.message, 'error', 5000); });
  }

  ngOnInit(): void {

  }


  // Notify method to show messages
  notify(msg: string, type: 'success' | 'error', duration: number) {
    this.snackBar.open(msg, 'Close', {
      duration: duration,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }
}
