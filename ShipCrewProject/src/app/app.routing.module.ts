import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewDetailPageComponent } from './crew-detail-page/crew-detail-page.component'; // Adjust the path accordingly
import { CrewComponent } from './crew/crew.component';
import { CertificateTypeAddComponent } from './certificate-type-add/certificate-type-add.component';
import { CertificateModalComponent } from './certificate-modal/certificate-modal.component';

export const routes: Routes = [
  // Define your routes here
  { path: '', component: CrewComponent },
  { path: 'crew/:id', component: CrewDetailPageComponent },
  { path: 'certificate-types', component: CertificateTypeAddComponent }
  //,
  //{ path: '', redirectTo: '/home', pathMatch: 'full' } // Adjust your default route as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}