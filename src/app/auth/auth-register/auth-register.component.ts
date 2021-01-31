import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../shared/directive/must-match.directive';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {
  submitted = false;
  isSignUpFailed = false;
  isSignUpSucceed = false;

  errorMessage = '';
  registerForm: FormGroup;


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    /*if (this.authService.) {
      // redirect to home if already logged in
      this.router.navigate(['/']);
    }*/
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value.name,
      this.registerForm.value.surname, this.registerForm.value.email,
      this.registerForm.value.password).subscribe(
      data => {
        this.isSignUpSucceed = true;
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error;
        this.isSignUpFailed = true;
      }
    );
  }

}
