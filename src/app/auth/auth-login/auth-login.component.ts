import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


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
  returnUrl: string;



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.authService.currentUserValue) {
      // redirect if already logged
      this.router.navigateByUrl(this.returnUrl);

    }
  }

  get f() { return this.loginForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (!this.loginForm.valid) { return; }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigateByUrl(this.returnUrl);

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
