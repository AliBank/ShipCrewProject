import { Component, OnInit, Optional } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrl: './crew-edit.component.scss',
  providers: [DatePipe]
})
export class CrewEditComponent implements OnInit {
  rCrew: any;
  rCertificate: Certificate = new Certificate();
  crewId: number;

  nationalities: string[] = [];
  currencies: string[] = [];
  certificateTypes: string[] = [];
  titles: string[] = [];

  constructor(private crewService: CrewService,
    private snackBar: MatSnackBar,
    @Optional() public dialogRef: MatDialogRef<CrewEditComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) {
    this.crewId = data.id;
  }

  ngOnInit(): void {
    this.crewService.getCrewById(this.crewId).subscribe(result => {
      if (result) {
        this.rCrew = result;
        this.loadData();
      }
    },
      error => { this.notify(error?.message, 'error', 5000); });
  }

  private loadData(): void {
    this.crewService.getNationalities().subscribe((data) => (this.nationalities = data));
    this.crewService.getCurrencies().subscribe((data) => (this.currencies = data));
    this.crewService.getCertificateTypes().subscribe((data) => (this.certificateTypes = data));
    this.crewService.getTitles().subscribe((data) => (this.titles = data));
  }

  removeCertificate(index: number): void {
    this.rCrew.certificates.splice(index, 1); // Remove certificate by index
  }

  addCertificate(){
   const certificate = new Certificate(
      this.rCertificate.type,
      this.rCertificate.description,
      this.rCertificate.issueDate,
      this.rCertificate.expiryDate
    );

    this.rCrew.certificates.push(certificate);

    // Reset the newCertificate object
    this.rCertificate = new Certificate();
  }

  // Notify method to show messages
  notify(msg: string, type: 'success' | 'error', duration: number) {
    this.snackBar.open(msg, 'Close', {
      duration: duration,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }

  onSave(): void {
      this.dialogRef.close(this.rCrew); // Close the dialog and return the crew object
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  goBack(): void {
    this.router.navigate(['/']); // Adjust the path as needed
  }
}
