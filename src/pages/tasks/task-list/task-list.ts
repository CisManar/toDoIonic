import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { category } from '../../../app/models/category';
import { task } from '../../../app/models/task';
import Lockr from 'lockr';
import { TaskDetailsPage } from '../task-details/task-details';
import { TaskFormPage } from '../task-form/task-form';


@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  categories: category[] = []

  testDate: Date = new Date();
  tasks: task[] = [];
  categoryID: number;
  displayNoCards = true;

  categoryName: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public events: Events) {


    this.categories = Lockr.get('categories');
    this.tasks = Lockr.get('tasks', []);

    this.categoryID = this.navParams.get('categoryID');

    events.subscribe('task:list',(categoryID, tasks,isHidden) => {
      console.log("Event wordk okkkkk !");
      
      this.categoryID = categoryID;
      this.tasks = tasks;
      this.displayNoCards = isHidden;

      if (this.tasks != null) {

        this.tasks = this.tasks.filter((tas) => tas.catID == this.categoryID)
        console.log("task after filter :" , this.tasks)
        this.displayNoCards = !this.displayNoCards;
  
      }

      
    let category = this.categories.find((data) => data.ID == this.categoryID);

    this.categoryName = category.title;
    })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }


  addTask() {
    this.navCtrl.push(TaskFormPage, { tas: null, categoryId: this.categoryID });
    console.log("Cat id from task list :" , this.categoryID);

  }
  editTask(tas: task) {

    if(this.categories == null) {
      return;
    }
    this.navCtrl.push(TaskFormPage, { tas: tas, categoryID: this.categoryID });
  }
  deleteTask(id: number) {
    console.log("delete task id:", id)
    this.tasks = this.tasks.filter((t) => t.id != id);
    Lockr.set("tasks", this.tasks);
  }

  confirmDelete(taskID) {
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

  this.navCtrl.push(TaskDetailsPage, { task: task });


}

}
