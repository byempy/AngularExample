import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPerson } from '../person/person';
import { PersonService } from '../person/person.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  person:IPerson;
  personForm: FormGroup;
  errorMessage: string;
  imageWidth: number = 500;
  imageHeight: number = 500;

  constructor(private fb: FormBuilder, private _personService: PersonService, private _route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
  
    let id = +this._route.snapshot.paramMap.get('id');
    this._personService.getPerson(id)
    .subscribe(person => {
      this.person = person,
      this.personForm = this.fb.group({
        firstName: [person.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        lastName: [person.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        title: [person.title, Validators.maxLength(10)],
        middleName: [person.middleName,Validators.maxLength(10)]
    });
    }
      , error => this.errorMessage = <any>error);
  }

  save():void{
    console.log('Saved: ' + JSON.stringify(this.personForm.value));
      let p:IPerson = Object.assign({}, this.person, this.personForm.value);
      this._personService.updatePerson(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: string) => this.errorMessage = <string>error
                );
  }

  delete():void{
    if(confirm("¿Seguro que quieres borrar este empleado?")){
    console.log('Deleted: ' + JSON.stringify(this.personForm.value));
      let p:IPerson = Object.assign({}, this.person, this.personForm.value);
      this._personService.deletePerson(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: string) => this.errorMessage = <string>error
                );
    }
  }

  private onSaveComplete(){
    this.personForm.reset();
    this.router.navigate(['/']);
  }

}
