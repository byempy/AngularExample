import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import { IPerson } from '../person/person';
import { PersonService } from '../person/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-add-person',
  templateUrl: './add-person.component.html',
})
export class AddPersonComponent implements OnInit {
  personForm: FormGroup;
  person: IPerson = {id : 0, firstName:"", lastName:"",middleName:"", title:""};
  emailMessage: string;
  errorMessage: string;

  private validationMessages = {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.'
  };

  constructor(private fb: FormBuilder, private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
      this.personForm = this.fb.group({
          firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          title: ['', Validators.maxLength(10)],
          middleName: ['',Validators.maxLength(10)]
      });

  }

  populateTestData(): void {
      this.personForm.patchValue({
          firstName: 'Jack',
          lastName: 'Harkness',
          emailGroup: {email: 'jack@torchwood.com', confirmEmail: 'jack@torchwood.com'}
      });
  }

  save(): void {
      console.log('Saved: ' + JSON.stringify(this.personForm.value));
      let p = Object.assign({}, this.person, this.personForm.value);
      this.personService.savePerson(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: string) => this.errorMessage = <string>error
                );
  }

  setMessage(c: AbstractControl): void {
      this.emailMessage = '';
      if ((c.touched || c.dirty) && c.errors) {
          this.emailMessage = Object.keys(c.errors).map(key =>
              this.validationMessages[key]).join(' ');
      }
  }

  private onSaveComplete(){
    this.personForm.reset();
    this.router.navigate(['/']);
  }

}
