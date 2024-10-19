import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { CrewService } from '../services/crew.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-crew-add',
  templateUrl: './crew-add.component.html',
  styleUrls: ['./crew-add.component.scss'],
  providers: [DatePipe]
})
export class CrewAddComponent implements OnInit, AfterViewInit {
  @ViewChild('crewForm') crewForm!: NgForm;
  crew: Crew = new Crew(); // Initialize the crew object
  /* countries = ['USA', 'Canada', 'UK', 'Germany']; // Example countries
  currencies = ['USD', 'EUR', 'GBP', 'CAD']; // Example currencies
  certificateTypes = ['Medical', 'Engineering', 'Safety', 'Technical']; */
  countries: string[] = [];
  currencies: string[] = [];
  certificateTypes: string[] = [];
  titles: string[] = [];
  newCertificate: Certificate = new Certificate(); // Temporary certificate for adding


  @ViewChildren('issueDatePicker') issueDatePickers!: QueryList<MatDatepicker<any>>;
  @ViewChildren('expiryDatePicker') expiryDatePickers!: QueryList<MatDatepicker<any>>;

  issueDateArray: MatDatepicker<any>[] = [];
  expiryDateArray: MatDatepicker<any>[] = [];

  constructor(
    private dialogRef: MatDialogRef<CrewAddComponent>,
    private crewService: CrewService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.crewService.getNextCrewId().subscribe(
      (id) => {
        this.crew.id = id; // Assign the next available ID
        this.loadData();
      },
      (error) => this.notify(error?.message, 'error', 5000)
    );
  }

  ngAfterViewInit(): void {
    // Convert QueryList to array after the view initializes
    this.issueDateArray = this.issueDatePickers.toArray();
    this.expiryDateArray = this.expiryDatePickers.toArray();
  }

  private loadData(): void {
    this.crewService.getCountries().subscribe((data) => (this.countries = data));
    this.crewService.getCurrencies().subscribe((data) => (this.currencies = data));
    this.crewService.getCertificateTypes().subscribe((data) => (this.certificateTypes = data));
    this.crewService.getTitles().subscribe((data) => (this.titles = data));
  }

  removeCertificate(index: number): void {
    this.crew.certificates.splice(index, 1); // Remove certificate by index
  }

  formatDate(date: Date | string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  addCertificate(): void {
    // Add the new certificate to the crew's certificates array
    const certificate = new Certificate(
      this.newCertificate.type,
      this.newCertificate.issueDate,
      this.newCertificate.expiryDate
    );

    this.crew.certificates.push(certificate);

    // Reset the newCertificate object
    this.newCertificate = new Certificate();
  }

  onSave(form: NgForm): void {
    if (this.crewForm.valid) {
      this.dialogRef.close(this.crew); // Close the dialog and return the crew object
    } else {
      this.snackBar.open('Form is invalid', 'Close', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close dialog without saving
  }

  notify(message: string, type: 'success' | 'error', duration: number): void {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}
