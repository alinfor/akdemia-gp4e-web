import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ContentDashboardComponent } from '../content-dashboard/content-dashboard.component';
import { ThemesComponent } from '../themes/themes.component';
import { ClientsComponent } from '../clients/clients.component';
import { ThemesInfosComponent } from '../themes/themes-infos/themes-infos.component';
import { InsertClientComponent } from '../clients/insert-client/insert-client.component';
import { RouterModule, Routes } from '@angular/router';
import { FormateursComponent } from '../formateurs/formateurs.component';
import { AddFormateurComponent } from '../formateurs/add-formateur/add-formateur.component';
import { FormationsComponent } from '../formations/formations.component';
import { UpdateFormationComponent } from '../formations/update-formation/update-formation.component';
import { SessionsComponent } from '../sessions/sessions.component';
import { SessionInfosComponent } from '../sessions/session-infos/session-infos.component';
import { CompaniesComponent } from '../companies/companies.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', component: ContentDashboardComponent},
      {path: 'catalogues/themes', component: ThemesComponent},
      {path: 'catalogues/formations', component: FormationsComponent},
      {path: 'catalogues/formations/update/:id', component: UpdateFormationComponent},
      {path: 'formateurs', component: FormateursComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'catalogues/themes/infos/:id', component: ThemesInfosComponent},
      {path: 'clients/insert', component: InsertClientComponent},
      {path: 'formateurs/insert', component: AddFormateurComponent},
      {path: 'formateurs/:id', component: AddFormateurComponent},
      {path: 'clients/:id', component: InsertClientComponent},
      {path: 'clients/employe/:id', component: InsertClientComponent},
      {path: 'clients/particulier/:id', component: InsertClientComponent},
      {path: 'clients/company/:id', component: InsertClientComponent},
      { path: 'sessions', component: SessionsComponent },
      {path: 'sessions/infos/:id', component: SessionInfosComponent},
      { path: 'compagnies', component: CompaniesComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
