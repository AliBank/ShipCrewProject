import {Certificate} from './certificate.model';

export class Crew {
    constructor(
      public id: number,
      public firstName: string,
      public lastName: string,
      public nationality: string,
      public title: string,
      public daysOnBoard: number,
      public dailyRate: number,
      public currency: string,
      public totalIncome: number,
      public certificates: Certificate[] = []
    ) {}
  
    calculateTotalIncome(): number {
      this.totalIncome = this.daysOnBoard * this.dailyRate;
      return this.totalIncome;
    }
  
    addCertificate(certificate: Certificate): void {
      this.certificates.push(certificate);
    }
  }