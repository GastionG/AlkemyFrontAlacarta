import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Recipe, recipeVoid } from 'src/app/models/recipe';
import { FoodApiService } from '../../services/food-api.service';
import { FoodListService } from '../../services/food-list.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit, OnDestroy {
  recipeVoid = new recipeVoid();
  @Input() recipe: Recipe = this.recipeVoid;
  contenido = true;
  statsShow = false;
  recipeInfo!: Recipe;
  food = new Subscription();
  addButtonDisabled = false;
  constructor(
    private foodListService: FoodListService,
    private foodService: FoodApiService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog

  ) {}

  ngOnInit(): void {
    if (this.recipe.title == 'void') {
      this.contenido = false;
    } else {
      this.contenido = true;
    }
  }
  ngOnDestroy(): void {
    this.food.unsubscribe;
  }

  stats() {
    this.statsShow = !this.statsShow;
  }
  delete() {
    const dialogRef = this.matDialog.open(ConfirmComponent, {})
    dialogRef.afterClosed().pipe(take(1)).subscribe((res)=>{
      if(res){
        this.foodListService.deleteFood(this.recipe.id);
        this.snackBar.open('Plano eliminado', 'Ok', {
          duration: 2000
        })
        
      }
    })
    
  }
  addFood(): void {
    this.addButtonDisabled = true;
    this.food = this.foodService.getFood(this.recipe.id).subscribe((res) => {
      const response = this.foodListService.addFood(res);
      this.snackBar.open(response, 'Ok', {
        duration: 2000
      }); 
      this.addButtonDisabled = false;
    });
  }
}
