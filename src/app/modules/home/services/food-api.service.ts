import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe, Recipes } from 'src/app/models/recipe';
import { Result } from 'src/app/models/result';

@Injectable({
  providedIn: 'root',
})
export class FoodApiService {
  apiKey = '79a244cef0734abbaa9e980555c5fab4';

  constructor(private http: HttpClient) {}

  getFood(id: number): Observable<Recipe> {
    return this.http.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${this.apiKey}`) as Observable<Recipe>;
  }

  searchFood(name: string): Observable<Result>{
    return this.http.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&query=${name}&number=4`) as Observable<Result>;
  }

}
