import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../core/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {MustMatch} from '../../shared/directive/must-match.directive';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  submitted = false;
  isUpdated = false;
  errorMessage = '';
  updateForm: FormGroup;
  user: User;
  constructor(
    private userService: UserService,

    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.updateForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'passwordConfirm'),
    });
  }

  get f() { return this.updateForm.controls; }


  onSubmit(): void {
    this.submitted = true;
    if (!this.updateForm.valid) { return; }
    this.userService.updatePassword(
      this.user.id,
      this.updateForm.value.oldPassword,
      this.updateForm.value.password,
      this.updateForm.value.passwordConfirm).subscribe(
      data => {
        this.isUpdated = true;
        this.authService.logOut('login');
      },
      err => {
        console.log(err);
        if (err.error !== undefined) {
          this.errorMessage = err.error;
        } else {
          console.log('test4');
        }
      }
    );
  }

}

