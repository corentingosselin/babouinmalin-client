import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
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
  roles: string[] = [];
  loginForm: FormGroup;


  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (!this.loginForm.valid) { return; }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/']);
      },
      err => {
        if (err.error.status === undefined) {
          this.errorMessage = 'Une erreur inconnue est survenue';
        } else {
          this.errorMessage = err.error;
        }
        this.isLoginFailed = true;
      }
    );
  }

}
