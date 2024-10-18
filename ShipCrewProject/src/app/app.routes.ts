import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewDetailPageComponent } from './crew-detail-page/crew-detail-page.component'; // Adjust the path accordingly

export const routes: Routes = [
  // Define your routes here
  { path: 'crew/:id', component: CrewDetailPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Adjust your default route as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
