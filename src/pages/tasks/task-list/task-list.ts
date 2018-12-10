import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { category } from '../../../app/models/category';
import { CategoryFormPage } from '../../Categories/category-form/category-form';
import { task } from '../../../app/models/task';
import { TaskFormPage } from '../task-form/task-form';
import { TaskDetailsPage } from '../task-details/task-details';
import Lockr from 'lockr';
import { createDirective } from '@angular/compiler/src/core';
import { CategoryListPage } from '../../Categories/category-list/category-list';


@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  categories : category[] = []

  testDate: Date = new Date();
  tasks : task[] = [];
  catid : number;
  displayNoCards = true;

  categoryName : string = "cat cat ";



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl : AlertController) {


    this.categories = Lockr.get('categories');
    this.tasks = Lockr.get('tasks');

    this.catid = this.navParams.get('catid');

    let cat = this.categories.find((data)=> data.ID == this.catid);

    this.categoryName = cat.title;
    console.log("categoryName : ", this.categoryName)
    this.selectCat(this.catid)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');

  }


  showTaskForm(tas : task) {
    
    if(this.categories == null) {
      return;
    }
   this.navCtrl.push(TaskFormPage,{tas:tas,catid:this.catid});
  }

  selectCat(id:number) {
    if(this.tasks != null) {

      this.tasks = this.tasks.filter((tas)=> tas.catID == id )
      this.displayNoCards = !this.displayNoCards;

    }

  }

  deleteTask(id : number) {
    this.tasks = this.tasks.filter((t) => t.id != id);
    Lockr.set("tasks",this.tasks);
    this.navCtrl.push(TaskListPage,{catid:this.catid});
  }

  presentConfirm(taskID) {
    let alert = this.alertCtrl.create({
      title: 'Do you want to DELETE this task?',
      message: 'you will be unabled to get it again ! ',
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
            this.deleteTask(taskID)
          }
        }
      ]
    });
    alert.present();
  }
  
  viewTaskDetails(task) {
    
    console.log("task to send ",task)
    this.navCtrl.push(TaskDetailsPage,{tas : task});
  }

}
