import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';
import { CategoryListPage } from '../category-list/category-list';
import Lockr from 'lockr';

@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage {

  categoryForm: FormGroup;
  categories: category[] = [];
  catToEdit: category = new category();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuiler: FormBuilder,
    public appCtrl : App) {

    this.categoryForm = this.formbuiler.group({
      title: ['', Validators.required],
    });

    this.catToEdit = navParams.get('category');

  //  Lockr.get('categories') ? this.categories = Lockr.get('categories') : 0;
    this.categories = Lockr.get('categories') ? Lockr.get('categories') : [];

  }

  ionViewDidLoad() {

    if (this.catToEdit == null) {
      return;
    }
    this.categoryForm.controls['title'].setValue(this.catToEdit.title);

  }

  sendCat() {

    if (this.categoryForm.invalid) {
      return;
    }
    //if the categore for add new or edit exist
    if (this.catToEdit == null) {
      this.addNew()
    } else {
      this.editCategory()
    }
  }

  addNew() {
    let maxId = 1
    //if it's empty
    this.catToEdit = this.categoryForm.value;

    if (this.categories != null && this.categories.length != 0) {
      maxId = this.getMax()
      this.catToEdit.ID = maxId;
      this.categories.push(this.catToEdit);
    }
    else {

      this.catToEdit.ID = maxId;
      this.categories = [this.catToEdit];
    }
    Lockr.set('categories', this.categories);
    this.appCtrl.getRootNav().setRoot(CategoryListPage);

  }
  
  editCategory() {
    let index = this.getCatIndex();
    this.catToEdit.title = this.categoryForm.controls['title'].value;

    this.categories[index].title = this.catToEdit.title;
    Lockr.set('categories', this.categories);
    this.appCtrl.getRootNav().setRoot(CategoryListPage);

  }

  getCatIndex() {

    for (let i = 0; i < this.categories.length; i++) {
      if (this.catToEdit.ID == this.categories[i].ID) {
        return i;
      }

    }

  }

  getMax() {

    let id: number;
    let length = this.categories.length - 1;
    id = this.categories[length].ID;
    return id + 1;
  }
}
