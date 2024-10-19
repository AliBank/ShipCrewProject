import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private crewList: Crew[] = [
    new Crew(
      1,
      'Ali',
      'Bank',
      'Turk',
      'Engineer',
      120,
      150,
      'TL',
      0,
      [new Certificate('Software', '', new Date('2024-10-12'), new Date('2025-10-12'))]
    ),
    new Crew(
      2,
      'Popeye',
      'Spinachson',
      'British',
      'Captain',
      90,
      130,
      'GBP',
      0,
      [new Certificate('Captain', '', new Date('2023-06-01'), new Date('2025-06-01'))]
    ),
    new Crew(
      3,
      'Matt',
      'Laventure',
      'French',
      'Cooker',
      60,
      100,
      'EUR',
      0,
      [new Certificate('Culinary', '', new Date('2022-05-15'), new Date('2024-05-15'))]
    ),
    new Crew(
      4,
      'Hirouki',
      'Takei',
      'Japanese',
      'Technician',
      150,
      40,
      'JPY',
      0,
      [new Certificate('Technic', '', new Date('2020-05-15'), new Date('2024-03-11'))]
    ),
    new Crew(
      5,
      'John',
      'McDonalds',
      'American',
      'Medic',
      300,
      85,
      'USD',
      0,
      [new Certificate('Medicine', '', new Date('2018-05-15'), new Date('2027-03-11'))]
    )
  ];

  // Example lists for countries, currencies, and certificate types
  nationalities = ['American', 'British', 'Turk', 'French', 'Arap', 'Japanese'];
  currencies = ['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'TL'];
  certificateTypes = ['Medicine', 'Engineering', 'Safety', 'Technic', 'Governor', 'Hygiene','Software','Culinary'];
  titles = ['Engineer', 'Captain', 'Medic', 'Cooker', 'Technician', 'Janitor'];

  constructor() {
    // Calculate initial total income for all crew members.
    this.crewList.forEach(crew => crew.calculateTotalIncome());
  }

  // Get the crew list as an observable.
  getCrewList(): Observable<Crew[]> {
    return of(this.crewList);
  }

  // Method to get a crew member by their ID
  getCrewById(id: number): Observable<Crew> {
    const crew = this.crewList.find(crew => crew.id === id);
    if (crew) {
      return of(crew);
    } else {
      throw new Error(`Crew with ID ${id} not found`);
    }
  }

  // Add a new crew member.
  addCrew(newCrew: Crew): Observable<boolean> {
    newCrew.calculateTotalIncome();
    this.crewList.push(newCrew);
    return of(true);
  }


  /*   // Expose as Observable
    getCrewList(): Observable<Crew[]> {
      return this.crewListSubject.asObservable();
    } */
  // Update an existing crew member.
  updateCrew(updatedCrew: Crew): Observable<boolean> {
    const index = this.crewList.findIndex(crew => crew.id === updatedCrew.id);
    if (index !== -1) {
      this.crewList[index] = updatedCrew;
      updatedCrew.calculateTotalIncome();
      return of(true);
    }
    return of(false);
  }

  // Delete a crew member by ID.
  deleteCrew(id: number): Observable<boolean> {
    this.crewList = this.crewList.filter(crew => crew.id !== id);
    return of(true);
  }

  // Get countries
  getNationalities(): Observable<string[]> {
    return of(this.nationalities);
  }

  // Get currencies
  getCurrencies(): Observable<string[]> {
    return of(this.currencies);
  }
  // Get titles
  getTitles(): Observable<string[]> {
    return of(this.titles);
  }

  // Get certificate types
  getCertificateTypes(): Observable<string[]> {
    return of(this.certificateTypes);
  }

  // Get a new certificate instance
  getNewCertificate(): Certificate {
    return new Certificate('', '', new Date(), new Date());
  }

  // Met/* */hod to add a new certificate type
  addCertificateType(newType: string): Observable<boolean> {
    if (!this.certificateTypes.includes(newType)) {
      this.certificateTypes.push(newType);
      return of(true); // Indicate success
    }
    return of(false); // If the type already exists
  }

  getNextCrewId(): Observable<number> {
    if (this.crewList && this.crewList.length > 0) {
      const maxId = Math.max(
        ...this.crewList.map(crew => crew.id).filter(id => id !== null && id !== undefined)
      );
      return of(maxId + 1); // Wrap the result in an Observable
    } else {
      return of(1); // If list is empty, return 1 wrapped in an Observable
    }
  }
}
