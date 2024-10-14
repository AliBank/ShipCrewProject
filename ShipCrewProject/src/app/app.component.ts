import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CrewService } from './services/crew.service';
import { Crew } from './models/crew.model';
import { Certificate } from './models/certificate.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ShipCrewProject';

  crewList: Crew[] = [];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'role', 'dailyRate', 'actions'];

  constructor(private crewService: CrewService) {}

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe((crewList: Crew[]) => {
      this.crewList = crewList;
    });
  }

}
