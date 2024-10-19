  export class Certificate {
    constructor(
      public type: string,
      public issueDate: Date, // Date object for issue date
      public expiryDate: Date // Date object for expiry date
    ) {}
  
    isExpired(): boolean {
      const today = new Date();
      return this.expiryDate < today;
    }
  }
  