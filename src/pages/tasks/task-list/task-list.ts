import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { category } from '../../../app/models/category';
import { CategoryFormPage } from '../../Categories/category-form/category-form';
import { task } from '../../../app/models/task';
import { TaskFormPage } from '../task-form/task-form';
import { TaskDetailsPage } from '../task-details/task-details';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  categories = []

  testDate: Date = new Date();
  tasks : task[] = [];

  tasksOriginal : task [] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl : ActionSheetController,
    private storage : Storage,
    private alertCtrl : AlertController) {



    this.storage.get("categories").then((cats)=>{
      this.categories = cats;

    })

    this.storage.get("tasks").then((tasks)=>{
      this.tasksOriginal = tasks;
      this.tasks = this.tasksOriginal;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  showCatsForm(cat : category) {
    this.navCtrl.push(CategoryFormPage,{cat:cat});
  }
  showTaskForm(tas : task) {
    if(this.categories == null) {
      this.presentAlert();
      return;
    }
   this.navCtrl.push(TaskFormPage,{tas:tas});
  }

  selectCat(id:number) {
    this.tasks = this.tasksOriginal.filter((tas)=> tas.catID == id )
  }
  toDoMenu(tasktodo) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Task settings',
      buttons: [
        {
          text: 'See Details',
          role: 'details',
          handler: () => {
            this.navCtrl.push(TaskDetailsPage,{tas:tasktodo})
          }
        },{
          text: 'Edit Task',
          handler: () => {
            this.navCtrl.push(TaskFormPage,{tas:tasktodo})
          }
        },{
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.presentConfirm(tasktodo.id);
          }
        }
      ]
    });
    actionSheet.present();
  }

  deleteTask(id : number) {
    this.tasks = this.tasksOriginal.filter((t) => t.id != id);
    this.storage.set("tasks",this.tasks);
   }

  presentConfirm(taskID) {
    let alert = this.alertCtrl.create({
      title: 'Do you want to DELETE this Category?',
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
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'you can\'t add task before add at least one category',
      buttons: ['ok']
    });
    alert.present();
  }

  resetFilter() {
    this.tasks = this.tasksOriginal;
  }
}
