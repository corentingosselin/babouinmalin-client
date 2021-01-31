import {Component, OnInit} from '@angular/core';
import {BarterService} from '../../core/services/barter.service';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {BarterDetailed} from '../../core/models/barter-detailed.module';

@Component({
  selector: 'app-my-barters',
  templateUrl: './my-barters.component.html',
  styleUrls: ['./my-barters.component.css']
})
export class MyBartersComponent implements OnInit {

  barters: Array<BarterDetailed> = [];
  constructor(private barterService: BarterService,
              private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.barterService.getBarters(this.authService.currentUserValue.id).subscribe(barters => {
      this.barters = barters;
    });
  }

  goToBarterDetails(id) {
    this.router.navigate(['/barter-detail', id]);
  }
}
