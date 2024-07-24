import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClientsComponent} from './views/clients/clients.component';
import {InsertClientComponent} from './views/clients/insert-client/insert-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {ConfirmBoxConfigModule, NgxAwesomePopupModule} from "@costlydeveloper/ngx-awesome-popup";
import {LoginComponent} from './public/login/login.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { FormateursComponent } from './views/formateurs/formateurs.component';
import { AddFormateurComponent } from './views/formateurs/add-formateur/add-formateur.component';
import { FormationsComponent } from './views/formations/formations.component';
import { UpdateFormationComponent } from './views/formations/update-formation/update-formation.component';
import { SessionsComponent } from './views/sessions/sessions.component';
import { SessionInfosComponent } from './views/sessions/session-infos/session-infos.component';
import { CompaniesComponent } from './views/companies/companies.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    InsertClientComponent,
    LoginComponent,
    FormateursComponent,
    AddFormateurComponent,
    FormationsComponent,
    UpdateFormationComponent,
    SessionsComponent,
    SessionInfosComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    ConfirmBoxConfigModule.forRoot(),
    FormsModule,
    // Needed for instantiating confirm boxes.
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}