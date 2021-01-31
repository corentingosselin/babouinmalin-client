import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BarterService} from '../../core/services/barter.service';
import {Barter} from '../../core/models/barter.model';
import {CategoryService} from '../../core/services/category.service';

@Component({
  selector: 'app-my-barter',
  templateUrl: './my-barter.component.html',
  styleUrls: ['./my-barter.component.css']
})
export class MyBarterComponent implements OnInit {

  barter: Barter;
  url: string;
  category: string;
  constructor(private route: ActivatedRoute,
              private barterService: BarterService,
              private router: Router,
              private categoryService: CategoryService) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('id');
    this.barterService.getBarter(id).subscribe(bd => {
      this.categoryService.getCategoryName(bd.barter.categoryID).subscribe(c => {
        this.barter = bd.barter;
        // @ts-ignore
        this.category = c;
        this.url = bd.url;
      });
    });
  }

  onDelete() {
    if (confirm('Êtes vous sûr de vouloir supprimer ' +  this.barter.title)) {
      this.barterService.deleteBarter(this.barter.id);
      this.router.navigate(['/my-barters']);
    }
  }
}
