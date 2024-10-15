import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';

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
      [new Certificate('Software', '2024-10-12', '2025-10-12')]
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
      [new Certificate('Captain', '2023-06-01', '2025-06-01')]
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
      [new Certificate('Culinary', '2022-05-15', '2024-05-15')]
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
      [new Certificate('Technic', '2020-05-15', '2024-03-11')]
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
      [new Certificate('Medicine', '2018-05-15', '2027-03-11')]
    )
  ];

  constructor() {
    // Calculate initial total income for all crew members.
    this.crewList.forEach(crew => crew.calculateTotalIncome());
  }

  // Get the crew list as an observable.
  getCrewList(): Observable<Crew[]> {
    return of(this.crewList);
  }

  // Add a new crew member.
  addCrew(newCrew: Crew): void {
    newCrew.calculateTotalIncome();
    this.crewList.push(newCrew);
  }

  // Update an existing crew member.
  updateCrew(updatedCrew: Crew): void {
    const index = this.crewList.findIndex(crew => crew.id === updatedCrew.id);
    if (index !== -1) {
      this.crewList[index] = updatedCrew;
      updatedCrew.calculateTotalIncome();
    }
  }

  // Delete a crew member by ID.
  deleteCrew(id: number): Observable<boolean> {
    this.crewList = this.crewList.filter(crew => crew.id !== id);
    return of(true);
  }
}
