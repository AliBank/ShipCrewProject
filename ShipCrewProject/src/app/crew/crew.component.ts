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
import { CertificateModalComponent } from '../certificate-modal/certificate-modal.component';

@Component({
  selector: 'crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss'
})
export class CrewComponent implements OnInit {
  title = 'ShipCrewProject';
  selectedLanguage: string = 'en';

  // Translations for labels
  translations: any = {
    en: {
      firstName: 'First Name',
      lastName: 'Last Name',
      title: 'Title',
      nationality: 'Nationality',
      currency: 'Currency',
      dailyRate: 'Daily Rate',
      daysOnBoard: 'Days On Board'
    },
    fr: {
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      title: 'Titre',
      nationality: 'Nationalité',
      currency: 'Devise',
      dailyRate: 'Taux journalier',
      daysOnBoard: 'Jours à bord'
    },
    pt: {
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      title: 'Título',
      nationality: 'Nacionalidade',
      currency: 'Moeda',
      dailyRate: 'Taxa Diária',
      daysOnBoard: 'Dias a Bordo'
    }
  };

  labels: any = this.translations[this.selectedLanguage]; // Labels for the selected language


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
    'totalIncome',
    'certificates'
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

  // Change language and update labels/*  */
  switchLanguage(language: string): void {
    this.selectedLanguage = language;
    this.labels = this.translations[language];
  }

  openCertificatesModal(certificates: Certificate[]): void {
    this.dialog.open(CertificateModalComponent, {
      width: '50%',
      data: { certificates },
    });
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
        }, error => { });
      }
    });
  }

}
