export class Certificate {
  constructor(
    public type: string = '', // Default to an empty string
    public description : string = '',
    public issueDate: Date = new Date(), // Default to today's date
    public expiryDate: Date = new Date() // Default to today's date
  ) {}

  isExpired(): boolean {
    const today = new Date();
    return this.expiryDate < today;
  }
}
