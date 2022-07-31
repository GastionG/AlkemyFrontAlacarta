import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FoodApiService } from './services/food-api.service';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';


import { HomeComponent } from './home/home.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { FoodListService } from './services/food-list.service';
import { StatsComponent } from './components/stats/stats.component';

@NgModule({
  declarations: [
    HomeComponent,
    RecipeCardComponent,
    RecipesListComponent,
    ToolbarComponent,
    SearchComponent,
    MenuComponent,
    StatsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    SharedModule,
    MatGridListModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  exports: [HomeComponent],
  providers: [FoodApiService, FoodListService],
  bootstrap: [HomeComponent]
})
export class HomeModule {}
