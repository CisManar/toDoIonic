import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { task } from '../../../app/models/task';
import { category } from '../../../app/models/category';
import Lockr from 'lockr';
import { TaskFormPage } from '../task-form/task-form';

@IonicPage()
@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {

  task : task;
  categories : category[];
  tasks : task[] = [];
  taskID : number = null; 
  categoryID : number = null;
  catName : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl : AlertController,
    public events : Events) {

    this.task = navParams.get('task')

    this.taskID = this.task.id;
    this.categoryID = this.task.catID;
    this.tasks = Lockr.get('tasks');
    this.categories = Lockr.get('categories');
    this.catName = this.getCat();

    events.subscribe('task:details',(tas,categoryID)=> {
      this.task = tas;
      this.categoryID = categoryID;
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

  confirmDelete() {
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
            this.deleteTask(this.taskID)
          }
        }
      ]
    });
    alert.present();
  }
  deleteTask(id : number) {
    this.tasks = this.tasks.filter((t) => t.id != id);
    Lockr.set("tasks",this.tasks);
    this.navCtrl.pop();

  }
  editTask() {
   this.navCtrl.push(TaskFormPage,{tas:this.task,categoryID:this.task.catID});
  }

}
