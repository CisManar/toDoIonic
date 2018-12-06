import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import {  category } from '../../../app/models/category';
import { CategoryformPage } from '../categoryform/categoryform';
import { Storage } from '@ionic/storage'
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
    private actionSheetCtrl:ActionSheetController,
    private storage : Storage) {

    this.categories = [
      {ID:1,title:"Daily"},
      {ID:2,title:"Monthly"},
      {ID:3,title:"Yearly"},
    ]
    /*
   storage.get('categories').then((cats)=>{
     this.categories = cats;
   })
   */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategorylistPage');
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
      this.navCtrl.push(CategoryformPage,{cat:category})
   }
}
