import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { TaskDetailsPage } from '../task-details/task-details';
import { task } from '../../app/models/task';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toDotasks : task[] = [] ;

  constructor(public navCtrl: NavController,
    private actionSheetCtrl:ActionSheetController) {

   
      
  }
//  id: 1, title:"Go To supermarket" , description:"go to buy choacolate" , dueDate:22/3/2019 , catID:1
  ionViewDidLoad() {

    this.toDotasks = [
      {id: 1, title:"Go To supermarket" , description:"go to buy choacolate" , dueDate: new Date() , catID:1},
      {id:2 , title:"Go To friend" , description:"go to friend" , dueDate: new Date() , catID:3}

    ]
  
  }
  showTaskForm() {
    alert('n');
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
            console.log('Archive clicked');
          }
        },{
          text: 'Delete',
          role: 'delete',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
