import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { PersonService } from './person.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PersonGuardService } from '../person-detail/person-guard.service';
import { PersonDetailComponent } from '../person-detail/person-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports:[
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
    {path: 'persons/:id',
     canActivate:[PersonGuardService],
     component: PersonDetailComponent},
    {path:'persons', component: PersonComponent}])],
  declarations: [PersonComponent, PersonDetailComponent],
  providers:[PersonService, PersonGuardService]
})

export class PersonModule { }
