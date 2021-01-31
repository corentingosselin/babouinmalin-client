import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fourohfour',
  templateUrl: './fourohfour.component.html',
  styleUrls: ['./fourohfour.component.css']
})
export class FourOhFourComponent  {

  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['/login']);
  }

}
