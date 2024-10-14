import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CrewService } from './services/crew.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, MatTableModule],
  providers: [CrewService],
  bootstrap: [AppComponent]
})
export class AppModule {}
