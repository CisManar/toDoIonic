import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { category } from '../../../app/models/category';
import { CategoryFormPage } from '../../Categories/category-form/category-form';
import { task } from '../../../app/models/task';
import { TaskFormPage } from '../task-form/task-form';
import { TaskDetailsPage } from '../task-details/task-details';


@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  categories : category[] = [
    {ID:1,title:"MMM"},
    {ID:3,title:"nn"}

  ]

  testDate: Date = new Date();
  tasks : task[] = [];

  tasksOriginal : task [] = [
    {id:1,title:"go to gym",description:"dddd",dueDate:this.testDate,catID:1},
    {id:2,title:"go to gymaa",description:"dddd",dueDate:this.testDate,catID:3},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl : ActionSheetController) {
    this.tasks = this.tasksOriginal;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  showCatsForm(cat : category) {
    this.navCtrl.push(CategoryFormPage,{cat:cat});
  }
  showTaskForm(tas : task) {
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
            this.deleteTask(tasktodo.id);
          }
        }
      ]
    });
    actionSheet.present();
  }
  deleteTask(id : number) {
    this.tasks = this.tasksOriginal.filter((t) => t.id != id);
   }
}
