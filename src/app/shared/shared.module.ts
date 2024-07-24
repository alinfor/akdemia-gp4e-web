import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './dashboard/nav-bar/nav-bar.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { FooterComponent } from './dashboard/footer/footer.component';



@NgModule({
  declarations: [
    /*NavBarComponent,
    SideBarComponent,
    FooterComponent*/
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
