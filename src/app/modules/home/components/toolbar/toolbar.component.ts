import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy{
  media = new Subscription;
  size = '';
  Xs = false;

  constructor(
    private mediaObserver: MediaObserver,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.media = this.mediaObserver.asObservable().subscribe((res)=>{
      this.size = res[0].mqAlias;
      switch(this.size) {
        case 'xs':
          this.Xs = true;
          break;
        case 'sm':
          this.Xs = false;
          break;
        case 'md':
          this.Xs = false;
          break;
        case 'lg':
          this.Xs = false;

        break;
        default:
          break;
      }
    })
  }
  ngOnDestroy(): void {
    this.media.unsubscribe();
  }

  buscar(): void{
    this.router.navigate(['/home/buscar']);
  }
  home(): void{
    this.router.navigate(['/home']);
  }
  logout(): void{
    this.authService.logout();
  }

}
