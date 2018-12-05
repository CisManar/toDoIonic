import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { task } from '../../app/models/task';
import { TaskFormPage } from '../tasks/task-form/task-form';
import { TaskDetailsPage } from '../tasks/task-details/task-details';
import { CategorylistPage } from '../categories/categorylist/categorylist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toDotasks : task[] = [] ;

  constructor(public navCtrl: NavController,
    private actionSheetCtrl:ActionSheetController) {



  }

  ionViewDidLoad() {

    this.toDotasks = [
      {id: 1, title:"Go To supermarket" , description:"go to buy choacolate" , dueDate: new Date() , catID:1},
      {id:2 , title:"Go To friend" , description:"go to friend" , dueDate: new Date() , catID:3}

    ]

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


  goToCategories() {
    this.navCtrl.push(CategorylistPage);
  }
}
