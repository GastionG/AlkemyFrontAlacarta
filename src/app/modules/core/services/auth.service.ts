import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, Subject, throwError } from 'rxjs';

import { IdToken } from 'src/app/models/token';

import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logged = new BehaviorSubject<boolean>(false);
  logged$ = this.logged.asObservable()
  constructor(private http: HttpClient, private router: Router) {}

  loggedState(state: boolean): void{
    this.logged.next(state);
  }

  login(user: User): Observable<IdToken | any>{
    return this.http.post<IdToken>('http://challenge-react.alkemy.org', user).pipe(
      map((res) => {
        const token = res.token;
        sessionStorage.setItem('id_token', token);
        this.loggedState(true);
        this.router.navigate(['/home']);
      })      
    );

  }
  logout(){
    this.loggedState(false);
    sessionStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }

  checkToken(): void{
    const token = sessionStorage.getItem('id_token');
    const isExpired = helper.isTokenExpired(token!)

    if(isExpired){
      this.logout()
    }
  
  }
}
