import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  @Input() recipes!: Recipe[];
  @Input() spaceBetween = 0; 
  fxFlex = 2;
  media = new Subscription;
  constructor(
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
    this.media = this.mediaObserver.asObservable().subscribe((res)=>{
      let size = res[0].mqAlias;
      switch(size) {
        case 'xs':
          this.changeCantPerRow(1);

          break;
        case 'sm':
          this.changeCantPerRow(2);

          break;
        case 'md':
          this.changeCantPerRow(4);
          
          break;
        case 'lg':
          this.changeCantPerRow(4);

        break;
        default:
          break;
      }
    })
  }
  ngOnDestroy(): void {
    this.media.unsubscribe();
  }

  changeCantPerRow(cant: number): void{
    this.fxFlex = ((100 - 1 * cant) / cant);
  }

}
