import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loginForm: FormGroup;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   /* if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //redirect if already logged
    }*/
  }

  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (!this.loginForm.valid) { return; }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        localStorage.setItem('token', data.token);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      },
      err => {
        if (err.error !== undefined) {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Une erreur inconnue est survenue';
        }
        this.isLoginFailed = true;
      }
    );
  }

}
