import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { task } from '../../app/models/task';
import { TaskFormPage } from '../tasks/task-form/task-form';
import { TaskDetailsPage } from '../tasks/task-details/task-details';
import { Storage } from '@ionic/storage';
import { category } from '../../app/models/category';
import { CategoryformPage } from '../categories/categoryform/categoryform';
import { CategorylistPage } from '../categories/categorylist/categorylist';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks : task[] = [] ;

  toDotasks : task[] = [] ;
  toDotasksOriginal : task[] = [] ;
  categories : category[] = [];

  constructor(public navCtrl: NavController,
    private actionSheetCtrl:ActionSheetController,
    private storage : Storage) {

      this.categories = [
        {ID:1,title:"Daily"},
        {ID:2,title:"Monthly"},
        {ID:3,title:"Yearly"},
      ];

      this.toDotasksOriginal = [
        {id: 1, title:"Go To supermarket" , description:"go to buy choacolate" , dueDate: new Date() , isDone:true , catID:1},
        {id:2 , title:"Go To friend" , description:"go to friend" , dueDate: new Date() , isDone:false , catID:3},
        {id: 3, title:"Go To gym" , description:"go to gym gym" , dueDate: new Date() , isDone:true , catID:2},
      ]

      this.resetTasksFilter();
  }

  ionViewDidLoad() {

    this.getTaskStorage();

  }
  resetTasksFilter() {
    this.toDotasks = this.toDotasksOriginal;
  }
  selectCat(cat: category) {
    this.toDotasks = this.toDotasksOriginal.filter(t => t.catID == cat.ID)
  }
  showTaskForm() {
    this.navCtrl.push(TaskFormPage,{task:null});
  }

  toDoMenu(tasktodo) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Task settings',
      buttons: [
        {
          text: 'See Details',
          role: 'details',
          handler: () => {
            this.navCtrl.push(TaskDetailsPage,{task:tasktodo})
          }
        },{
          text: 'Edit Task',
          handler: () => {
            this.navCtrl.push(TaskFormPage,{task:tasktodo})
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
   this.toDotasks = this.toDotasks.filter((t) => t.id != id);
  }

  

  setTaskStorage() {
    this.storage.set("tasks", this.tasks);
  }

  getTaskStorage() {
    this.storage.get('tasks').then((t) => {
       this.tasks = t;
    })
  }
  showCatsForm() {
    this.navCtrl.push(CategoryformPage);
  }
  toCategoryList(){
    this.navCtrl.push(CategorylistPage);
  }
  
  
  
}
