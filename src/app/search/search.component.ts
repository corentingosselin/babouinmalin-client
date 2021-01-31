import {Component, OnInit} from '@angular/core';
import {Category} from '../core/models/category.model';
import {CategoryService} from '../core/services/category.service';
import {BarterService} from '../core/services/barter.service';
import {BarterDetailed} from '../core/models/barter-detailed.module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: Array<Category> = [];
  selectedCategories: Array<number> = [];
  list: Array<BarterDetailed> = [];

  constructor(private categoryService: CategoryService, private barterService: BarterService) {
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
    this.list = this.getList();
  }

  select(id: number): void {
    if (this.selectedCategories.includes(id)) {
      const tag =  document.getElementById('category-' + id);
      tag.style.backgroundColor = 'white';
      tag.style.color = '#007CA2';
      const index = this.selectedCategories.indexOf(id);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    } else {
      const tag = document.getElementById('category-' + id);
      tag.style.backgroundColor = '#007CA2';
      tag.style.color = 'white';
      this.selectedCategories.push(id);
    }
    this.list = this.getList();
  }

  filterList(input: string) {
    if (input === '') {
      this.list = this.getList();
      return;
    }
    this.list = this.list.filter(bd => {
      return bd.barter.title.includes(input)
        || bd.barter.description.includes(input)
        || bd.barter.desire.includes(input);
    });
  }

  getList(): BarterDetailed[] {
    const barters: Array<BarterDetailed> = [];
    if (this.selectedCategories.length <= 0) {
      this.barterService.getLastBarters().subscribe(list => {
        list.forEach(bd => {
          barters.push(bd);
        });
      });
    } else {
      this.selectedCategories.forEach(i => {
        this.barterService.getBarterByCategory(i).subscribe(list => {
          list.forEach(bd => {
            barters.push(bd);
          });
        });
      });
    }
    return barters;
  }


}
