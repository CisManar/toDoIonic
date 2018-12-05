import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { category } from '../../../app/models/category';
import { CategoryformPage } from '../categoryform/categoryform';

/**
 * Generated class for the CategorylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorylist',
  templateUrl: 'categorylist.html',
})
export class CategorylistPage {

  categories : category[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl:ActionSheetController) {

    this.categories = [
      {ID:1,title:"Daily"},
      {ID:2,title:"Monthly"},
      {ID:3,title:"Yearly"},
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorylistPage');
  }

  toDoMenu(category) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Category settings',
      buttons: [
        {
          text: 'Go to category tasks',
          handler: () => {
            this.navCtrl.push(CategoryformPage,{cat:category})
          }
        },
        {
          text: 'Edit Task',
          handler: () => {
            this.navCtrl.push(CategoryformPage,{cat:category})
          }
        },{
          text: 'Delete',
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
}
