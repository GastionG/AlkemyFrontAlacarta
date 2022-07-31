import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { AuthService } from '../../core/services/auth.service';
import { FoodApiService } from '../services/food-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy{

  isLogged = false;
  auth!: Subscription;

  constructor(
    public authService: AuthService
    ) {}
  
  ngOnInit(): void {
    this.auth = this.authService.logged$.subscribe((res)=>this.isLogged = res);
  }
  ngOnDestroy(): void {
    this.auth.unsubscribe();
  }

  logout(): void {
    this.authService.logout(); 
  }
}
