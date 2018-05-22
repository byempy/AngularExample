import { Component } from '@angular/core';

import { IPerson } from './person';
import { PersonService } from './person.service';

@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})

export class PersonComponent {

  pageTitle: string = "Consultor Personas";
  nameFilter: string;
  lastNameFilter: string;

  persons: IPerson[];
  errorMessage: string = "";

  constructor(private _personService: PersonService) { 
    this.nameFilter="";
    this.lastNameFilter="";
  }

  onClick():void{
    
    this._personService.getPersons(this.nameFilter, this.lastNameFilter)
    .subscribe(persons => {
      this.persons = persons
    }
      , error => this.errorMessage = <string>error);
  }

  onClear():void{
    this.nameFilter = "";
    this.lastNameFilter = "";
    this.persons = [];
  }
}
