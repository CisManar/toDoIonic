import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CategoryListPage } from '../Categories/category-list/category-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  toCategoryList() {
    this.navCtrl.push(CategoryListPage)
  }
}
