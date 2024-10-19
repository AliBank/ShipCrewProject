import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Certificate } from '../models/certificate.model';

@Component({
  selector: 'app-certificate-modal',
  templateUrl: './certificate-modal.component.html',
  styleUrls: ['./certificate-modal.component.scss'],
})
export class CertificateModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CertificateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { certificates: Certificate[] }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
