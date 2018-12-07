import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { task } from '../../../app/models/task';
import { Storage } from '@ionic/storage';
import { category } from '../../../app/models/category';

/**
 * Generated class for the TaskDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {

  task : task;
  categories : category[];

  catName : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage:Storage) {
    this.task = navParams.get('tas')

    this.storage.get("categories").then((cats)=>{
      this.categories = cats;
      this.catName = this.getCat();

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailsPage');
  }
  getCat() {

      for(let i=0;i<this.categories.length;i++) {
        if(this.task.catID == this.categories[i].ID) {
          return this.categories[i].title;
        }

      }

  }
}
