export class Certificate {
    constructor(
      public type: string,
      public issueDate: string, // ISO date format, e.g., '2024-10-12'
      public expiryDate: string // ISO date format, e.g., '2025-10-12'
    ) {}
  
    isExpired(): boolean {
      const today = new Date().toISOString().split('T')[0];
      return this.expiryDate < today;
    }
  }