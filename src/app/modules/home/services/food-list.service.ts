import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe';
import { Stats } from 'src/app/models/stats';
import { FoodApiService } from './food-api.service';

@Injectable({
  providedIn: 'root',
})
export class FoodListService implements OnInit{
  private foodList: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(
    []
  );
  foodList$ = this.foodList.asObservable();
  private foodStats: BehaviorSubject<Stats> = new BehaviorSubject<Stats>({
    cant: 0,
    cantVegan: 0,
    cantNoVegan: 0,
    totalHealthScore: 0,
    averageHealthScore: 0,
    totalTime: 0,
    averageTime: 0,
    totalPrice: 0
  });
  foodStats$ = this.foodStats.asObservable();
  estado = false;
  constructor() {}

  ngOnInit(): void {
  }
  refreshStats(){
    const list = this.foodList.getValue();
    const stat = {
      cant: 0,
      cantVegan: 0,
      cantNoVegan: 0,
      totalHealthScore: 0,
      averageHealthScore: 0,
      totalTime: 0,
      averageTime: 0,
      totalPrice: 0
    };
    list.forEach(element => {
      stat.cant += 1;

      element.vegan ? stat.cantVegan += 1 : stat.cantNoVegan += 1;

      stat.totalHealthScore += element.healthScore;
      stat.totalTime += element.readyInMinutes;
      stat.totalPrice += element.pricePerServing;
    });
    stat.totalPrice = Math.round(stat.totalPrice);
    stat.averageHealthScore = Math.round(stat.totalHealthScore / stat.cant);
    stat.averageTime = Math.round(stat.totalTime / stat.cant);
    
    this.foodStats.next(stat);
  }
  addFood(recipe: Recipe): string {
    const food = this.foodList.getValue();
    const id = recipe.id;
    const stats = this.foodStats.getValue();

    if (food.length >= 4) {
      return 'El menu ya esta lleno, el maximo de platos permitidos es 4';
    }
    else if(recipe.vegan && stats.cantVegan >= 2){
      return 'No puede haber mas de dos platos veganos en el menu';
    }
    else if(stats.cantNoVegan >= 2){
      return 'No puede haber mas de dos platos no veganos en el menu';
    }
    else if(this.searchRecipeById(food, id)){
      return 'Este plato ya esta en el menu, no puedes repetirlo';
    }
    else{
      this.addRecipeToList(recipe);
      return 'Plato agregado al menu';
    }
  }
  searchRecipeById(recipeList: Recipe[], id: number): boolean {
    let state = false;
    recipeList.every((element) => {
      if (element.id == id) {
        state = true;
        return false
      } else {
        state = false;
        return true;
      }
    });
    
    return state;
  }
  addRecipeToList(recipe: Recipe){
    this.foodList.next(this.foodList.getValue().concat(recipe));
    this.refreshStats();
  }
  deleteFood(id: number) {
    this.foodList.next(
      this.foodList.getValue().filter((element) => element.id != id)
    );
    this.refreshStats();
  }
}
