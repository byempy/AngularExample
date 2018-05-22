import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonModule } from './person/person.module';
import { PersonComponent } from './person/person.component';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PersonGuardService } from './person-detail/person-guard.service';
import { AddPersonModule } from './add-person/add-person.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PersonModule,
    AddPersonModule,
    HttpModule,
    RouterModule.forRoot([
     {path: '', component:PersonComponent},
     {path:'**', component:PersonComponent}])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
