import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stats } from 'src/app/models/stats';
import { FoodListService } from '../../services/food-list.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy{
  public stats!: Stats;
  foodList = new Subscription;
  hayPlatos = false;
  constructor(private foodListService: FoodListService) { }

  ngOnInit(): void {
    this.foodList = this.foodListService.foodStats$.subscribe((res)=>{
      this.stats = res;
      this.stats.cant == 0 ? this.hayPlatos = false : this.hayPlatos = true;
      
    });
  }
  ngOnDestroy(): void {
    this.foodList.unsubscribe();
  }
}
