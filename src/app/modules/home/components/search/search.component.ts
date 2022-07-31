import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, map, timer } from 'rxjs';

import { Recipe } from 'src/app/models/recipe';

import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FoodApiService } from '../../services/food-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  search = new FormControl('');
  resultRecipes!: Recipe[];
  encontrado = false;
  buscando = false;
  vacio = false;
  constructor(
    private foodService: FoodApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkToken();

    this.search.valueChanges
      .pipe(
        map((res) => {
          let text = res!.trim();
          if (text.length >= 2) {
            this.buscando = true;
            return text;
          }
          this.buscando = false;
          return false;
        }),
        debounce(() => timer(1000))
      )
      .subscribe((res) => {
        if(res != false){
          this.foodService.searchFood(res).subscribe((res) => {
            this.resultRecipes = res.results;
            this.vacio = false;
            this.encontrado = true;
            this.buscando = false;
            if(this.resultRecipes.length == 0){
              this.vacio = true;
              
            }
          });
        }
      });
  }
}
