import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../modules/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  logged = Observable<boolean>;

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.logged$.pipe(
      map(
        (res)=>res
      )
    )
  }
}
