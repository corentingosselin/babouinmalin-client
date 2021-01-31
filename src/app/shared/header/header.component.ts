import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  currentUser: User;
  constructor(public authService: AuthService) {
    this.authService.currentUser.subscribe(u => this.currentUser = u);

  }

}
