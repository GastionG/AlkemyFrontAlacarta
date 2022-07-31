import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipeVoid, Recipe } from 'src/app/models/recipe';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FoodApiService } from '../../services/food-api.service';
import { FoodListService } from '../../services/food-list.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  isLogged = false;
  auth = new Subscription();
  vacio = true;
  recipeVoid = new recipeVoid
  public recipes: Recipe[] = [this.recipeVoid];

  constructor(
    public authService: AuthService,
    private foodService: FoodApiService,
    private foodListService: FoodListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.logged$.subscribe(
      (res) => (this.isLogged = res)
    );

    this.authService.checkToken();

    this.foodListService.foodList$.subscribe((res) => {
      this.recipes = res;
      if (this.recipes.length == 0){
        this.vacio = true;
      }
      else{
        this.vacio = false;
        
      }
    });
  }
  ngOnDestroy(): void {
    this.auth.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
  
  buscar(){
    this.router.navigate(['/home/buscar']);
  }
}
