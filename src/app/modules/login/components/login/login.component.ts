import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

import { AuthService } from 'src/app/modules/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy{
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isLogged = false;
  loggedSubscribe!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedSubscribe = this.authService.logged$.subscribe(
      (res)=>{this.isLogged = res}
    )
  }
  ngOnDestroy(): void {
    this.loggedSubscribe.unsubscribe()
  }

  loginSubmit() {
    const formValue: User = this.form.value;
    this.loading();
    this.authService.login(formValue).subscribe({
      next: () => {
        this.success();
      },
      error: () => {
        this.error();
      },
    });
  }
  loading(){
    Swal.fire({
      heightAuto: false,
      width: 'auto'
    })
    Swal.showLoading();
  }
  success(){
    Swal.fire({
      icon: 'success',
      heightAuto: false,
      showConfirmButton: false,
      timer: 1500,

    });
  }
  error(){
    Swal.fire({
      icon: 'error',
      heightAuto: false,
      showConfirmButton: false,
      timer: 1500,

    });
  }

}
