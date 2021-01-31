import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../core/services/auth.service';
import {User} from '../core/models/user.model';
import {StatsService} from '../core/services/stats.service';
import {Stats} from '../core/models/stats.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  stats: Stats;

  constructor(private authService: AuthService, private statService: StatsService) {
    this.authService.currentUser.subscribe(u => this.currentUser = u);
    this.statService.getStats().subscribe(s => this.stats = s);
  }

  ngOnInit(): void {
  }
}
