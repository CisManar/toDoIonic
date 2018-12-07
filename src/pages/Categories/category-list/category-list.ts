import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { category } from '../../../app/models/category';
import { CategoryFormPage } from '../category-form/category-form';

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categories : category[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage : Storage,
    private actionSheetCtrl: ActionSheetController) {

      this.categories = [
        {ID:1,title:"Daily"},
        {ID:2,title:"Monthly"},
        {ID:3,title:"Yearly"},
      ]
      /*
      this.storage.get("categories").then((cats)=>{
        this.categories = cats;

      })
      */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }
  toDoMenu(category) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Category settings',
      buttons: [

        {
          text: 'Edit Category',
          handler: () => {
            this.showCatsForm(category);
          }
        },{
          text: 'Delete Category',
          role: 'delete',
          handler: () => {
            this.deleteCategory(category.ID);
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteCategory(id : number) {
    this.categories = this.categories.filter((t) => t.ID != id);
   }
   showCatsForm(category : category) {
      this.navCtrl.push(CategoryFormPage,{cat:category})
   }
}
