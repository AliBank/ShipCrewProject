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
import { CrewDetailPageComponent } from './crew-detail-page/crew-detail-page.component';
import { CrewComponent } from './crew/crew.component';
import { CrewAddComponent } from './crew-add/crew-add.component';
import { MatIconModule } from '@angular/material/icon'; // For icons
import { MatTooltipModule } from '@angular/material/tooltip'; // For tooltips
import { AppRoutingModule } from './app.routing.module'; // Adjust the import path
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { MatOptionModule } from '@angular/material/core'; // MatOption is included in core
import { ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Datepicker module
import { MatNativeDateModule } from '@angular/material/core'; // Native date support
import { CertificateTypeAddComponent } from './certificate-type-add/certificate-type-add.component';
import { CertificateModalComponent } from './certificate-modal/certificate-modal.component';
import { CrewEditComponent} from './crew-edit/crew-edit.component';



@NgModule({
  declarations: [AppComponent, CrewComponent, CrewDetailPageComponent, CrewAddComponent, CertificateTypeAddComponent, CertificateModalComponent, CrewEditComponent],
  imports: [AppRoutingModule,BrowserModule, FormsModule, MatTableModule, BrowserAnimationsModule,MatListModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule,MatTooltipModule,MatDialogModule, MatTabsModule, 
    MatSelectModule, MatOptionModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  providers: [CrewService],
  bootstrap: [AppComponent]
})
export class AppModule {}
