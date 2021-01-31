import { Component, OnInit } from '@angular/core';
import {User} from '../core/models/user.model';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logOut('home');
  }
}
