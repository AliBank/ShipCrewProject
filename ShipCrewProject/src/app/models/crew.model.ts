import {Certificate} from './certificate.model';

export class Crew {
    constructor(
      public id: number | null = null,
      public firstName: string = '',
      public lastName: string = '',
      public nationality: string = '',
      public title: string = '',
      public daysOnBoard: number | null = null,
      public dailyRate: number | null = null,
      public currency: string = '',
      public totalIncome: number | null = null,
      public certificates: Certificate[] = []
    ) {}
  
    calculateTotalIncome(): number {
      if(!this.dailyRate || !this.daysOnBoard)
        this.totalIncome = 0;
      else
        this.totalIncome = this.daysOnBoard * this.dailyRate;
      return this.totalIncome;
    }
  
    addCertificate(certificate: Certificate): void {
      this.certificates.push(certificate);
    }
  }