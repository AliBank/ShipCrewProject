import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrewService } from '../services/crew.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-certificate-type-add',
  templateUrl: './certificate-type-add.component.html',
  styleUrls: ['./certificate-type-add.component.scss']
})
export class CertificateTypeAddComponent implements OnInit {
  newType: string = '';
  description: string = ''; // New field for description
  certificateTypes: string[] = [];

  constructor(
    private crewService: CrewService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCertificateTypes();
  }

  loadCertificateTypes(): void {
    this.crewService.getCertificateTypes().subscribe((types) => {
      this.certificateTypes = types;
    });
  }

  addCertificateType(): void {
    if (this.newType.trim() && this.description.trim()) {
      this.crewService
        .addCertificateType(this.newType)
        .subscribe((success) => {
          if (success) {
            this.snackBar.open('Certificate type added successfully!', 'Close', {
              duration: 3000,
            });
            this.newType = ''; // Reset input fields
            this.description = '';
            this.loadCertificateTypes(); // Refresh the list
          } else {
            this.snackBar.open('Certificate type already exists.', 'Close', {
              duration: 3000,
            });
          }
        });
    } else {
      this.snackBar.open('Please enter both type and description.', 'Close', {
        duration: 3000,
      });
    }
  }

  returnToCrewList(): void {
    this.router.navigate(['/']); // Navigate back to the home page or crew list
  }
}
