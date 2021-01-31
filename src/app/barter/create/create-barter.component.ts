import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../core/models/category.model';
import {HttpClient} from '@angular/common/http';
import {CategoryService} from '../../core/services/category.service';
import {Router} from '@angular/router';
import {BarterService} from '../../core/services/barter.service';
import {AuthService} from '../../core/services/auth.service';


@Component({
  selector: 'app-create-barter',
  templateUrl: './create-barter.component.html',
  styleUrls: ['./create-barter.component.css']
})
export class CreateBarterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private categoryService: CategoryService,
    private  barterService: BarterService,
    private authService: AuthService,
    private router: Router) {

    if (this.categories.length <= 0) { this.getAllCategories(); }
  }
  createForm: FormGroup;
  submitted = false;
  url: string | ArrayBuffer = 'https://www.richardfremont.com/wp-content/themes/trend/assets/img/empty/424x500.png';
  file: File;

  categories: Array<Category> = [];

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      desire: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(6)]],
      type: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (!this.createForm.valid) { return; }
    const c = this.createForm.controls;
    const barter = {
      title: c.title.value,
      description: c.description.value,
      desire: c.desire.value,
      user_id: this.authService.currentUserValue.id,
      categoryID: c.type.value
    };

    const formData = new FormData();
    formData.append('file', this.file);

    const barterJson = JSON.stringify(barter);
    const barterBlob = new Blob([barterJson], { type: 'application/json'});
    formData.append('barter', barterBlob);
    this.barterService.createBarter(formData).subscribe((result) => {
      this.router.navigate(['/my-barters']);
    });
  }

  public getAllCategories() {
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }
}
