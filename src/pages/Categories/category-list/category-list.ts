import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { category } from '../../../app/models/category';
import { CategoryFormPage } from '../category-form/category-form';
import { task } from '../../../app/models/task';
import { TaskListPage } from '../../Tasks/task-list/task-list';
import Lockr from 'lockr';

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

  categories : category[] = [];
  tasks : task[] = [];

  cat : category;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl : AlertController,
    ) {
     Lockr.get('categories')? this.categories = Lockr.get('categories') : 0;
     Lockr.get('tasks')? this.tasks = Lockr.get('tasks') : 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
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

    if(this.tasks != null) {
      this.tasks = this.tasks.filter((t) => t.catID != id); // delete tasks belong to category
    }

    Lockr.set('categories',this.categories);
    Lockr.set('tasks',this.tasks);

   }
  showCatsForm(category : category) {
    this.navCtrl.push(CategoryFormPage,{cat:category})
  }
  categoryTasks(catid : number) {
    this.navCtrl.push(TaskListPage,{catid:catid});
  }
}
