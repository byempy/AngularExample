import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPerson } from './person';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {
  
  baseUrl: string = "http://localhost:56215/api/Person";

  constructor(private _http: Http){}

  getPersons(firstName: string, lastName: string): Observable<IPerson[]> {
    let personUrl: string = this.baseUrl + "?firstName=" + firstName + "&lastName=" + lastName;
      return this._http.get(personUrl)
      .map(this.extractData)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getPerson(id: number): Observable<IPerson> {
    let personUrl: string = this.baseUrl + "?id=" + id;
    return this._http.get(personUrl)
    .map(this.extractData)
    .do(data => console.log('All: ' + JSON.stringify(data)))
    .catch(this.handleError);
}


  savePerson(person: IPerson):Observable<IPerson>{
    let personUrl: string = this.baseUrl + "?firstName=" + person.firstName + "&lastName=" + person.lastName
                            + "&middlename=" + person.middleName + "&title=" + person.title;
    return this._http.post(personUrl,null)
    .map(this.extractData)
    .catch(this.handleError);

  }

  updatePerson(person: IPerson):Observable<IPerson>{
    let personUrl: string = this.baseUrl + "?id=" + person.id + "&firstName=" + person.firstName + "&lastName=" + person.lastName
                            + "&middlename=" + person.middleName + "&title=" + person.title;

    return this._http.post(personUrl,null)
    .map(this.extractData)
    .do(data=>console.log("Update:"+JSON.stringify(data)))
    .catch(this.handleError);
  }

  deletePerson(person: IPerson):Observable<IPerson>{
    let personUrl: string = this.baseUrl + "?id=" + person.id;

    return this._http.post(personUrl,null)
    .map(this.extractData)
    .do(data=>console.log("Update:"+JSON.stringify(data)))
    .catch(this.handleError);
  }

  private handleError(err: Response){
      console.log(err.json());
      return Observable.throw(err.json());
  }

  private extractData(response: Response) {
    return response.json();
  }
}
