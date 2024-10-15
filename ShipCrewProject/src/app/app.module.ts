import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using mat-button
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule if using mat-card

import { CrewService } from './services/crew.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, MatTableModule, BrowserAnimationsModule,MatListModule,MatButtonModule,MatCardModule],
  providers: [CrewService],
  bootstrap: [AppComponent]
})
export class AppModule {}
