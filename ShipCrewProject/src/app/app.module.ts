import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatListModule } from '@angular/material/list'; // Import MatListModule here
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule if you're using mat-button
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule if using mat-card
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CrewService } from './services/crew.service';
import {CrewDetailPageComponent} from './crew-detail-page/crew-detail-page.component';
import { MatIconModule } from '@angular/material/icon'; // For icons
import { MatTooltipModule } from '@angular/material/tooltip'; // For tooltips
import { AppRoutingModule } from './app.routing.module'; // Adjust the import path

@NgModule({
  declarations: [AppComponent, CrewDetailPageComponent],
  imports: [AppRoutingModule,BrowserModule, FormsModule, MatTableModule, BrowserAnimationsModule,MatListModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule,MatTooltipModule],
  providers: [CrewService],
  bootstrap: [AppComponent]
})
export class AppModule {}
