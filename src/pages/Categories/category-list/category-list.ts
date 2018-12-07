import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { category } from '../../../app/models/category';
import { CategoryFormPage } from '../category-form/category-form';
import { task } from '../../../app/models/task';

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
  tasks : task[] ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage : Storage,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl : AlertController) {



      this.storage.get("categories").then((cats)=>{
        this.categories = cats;

      })

      this.storage.get("tasks").then((tasks)=>{
        this.tasks = tasks;
      })

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
            this.presentConfirm(category.ID);
          }
        }
      ]
    });
    actionSheet.present();
  }
  presentConfirm(catID) {
    let alert = this.alertCtrl.create({
      title: 'Do you want to DELETE this Category?',
      message: 'deleting category will delete all tasks that belong to it ! ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'I\'m sure',
          handler: () => {
            this.deleteCategory(catID)
          }
        }
      ]
    });
    alert.present();
  }

  deleteCategory(id : number) {
    this.categories = this.categories.filter((t) => t.ID != id); // delete category

    this.tasks = this.tasks.filter((t) => t.catID != id); // delete tasks belong to category

    this.storage.set('categories',this.categories);
    this.storage.set('tasks',this.tasks);
   }
   showCatsForm(category : category) {
      this.navCtrl.push(CategoryFormPage,{cat:category})
   }
}
