import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  updateForm: FormGroup;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,

    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.updateForm = this.formBuilder.group({
      oldEmail: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.updateForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (!this.updateForm.valid) { return; }
    this.userService.update(this.user.id, this.updateForm.value.oldEmail, this.updateForm.value.email).subscribe(
      data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.authService.logOut('login');

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
