import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { loginUser } from '../model/loginuser';
import { UserData } from '../model/userdata';
import { Cards } from '../model/cards';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'https://aqueous-dusk-51301.herokuapp.com/v1';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }




  signIn(signin: loginUser): Observable<loginUser> {
    return this.http.post<loginUser>(`${apiUrl}/users/login`, signin, httpOptions)
  }

  getuser(): Observable<any>{
    const token = localStorage.getItem("token");
    const header = new HttpHeaders({ 'Authorization': token! });
    const options = {
       headers: header,
    };     
    return this.http.get(`${apiUrl}/users`, options);
  }

  register(register :UserData): Observable<UserData>{
    return this.http.post<loginUser>(`${apiUrl}/users`, register, httpOptions)
  }

  getCards(): Observable<any>{
    const token = localStorage.getItem("token");
    const header = new HttpHeaders({ 'Authorization': token! });
    const options = {
       headers: header,
    };     
    return this.http.get(`${apiUrl}/cards`, options);
  }

  addCards(cards : Cards) :Observable<any>{
    const token = localStorage.getItem("token");
    const header = new HttpHeaders({ 'Authorization': token! });
    const options = {
       headers: header,
    }; 
    return this.http.post<loginUser>(`${apiUrl}/card`, cards, options)
  }


}
