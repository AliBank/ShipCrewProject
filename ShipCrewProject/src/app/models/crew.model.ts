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

        switch (this.title) {
          case 'Captain':
            this.totalIncome = 4*this.totalIncome;
            break; // Highest multiplier
          case 'Engineer':
            this.totalIncome = 3*this.totalIncome;
            break;
          case 'Medic':
            this.totalIncome = 2*this.totalIncome;
            break;
          case 'Cooker':
            this.totalIncome = 1.7*this.totalIncome;
            break;
          case 'Technician':
            this.totalIncome = 1.5*this.totalIncome;
            break;
          case 'Janitor':
            this.totalIncome = 1.2*this.totalIncome; // Base multiplier
            break;
          default:
            this.totalIncome = 1*this.totalIncome; // Default multiplier
            break;
        }

        return this.totalIncome;
    }
  
    addCertificate(certificate: Certificate): void {
      this.certificates.push(certificate);
    }
  }