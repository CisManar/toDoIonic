import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { task } from '../../../app/models/task';

/**
 * Generated class for the TaskFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {

  formTitle : string;
  taskForm : FormGroup;
  tasktoEdit : task;
  isNew : boolean = true;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formbuiler:FormBuilder) {

      this.taskForm = this.formbuiler.group({
        title : ['',Validators.required],
        description : ['',Validators.required],
        dueDate : ['',Validators.required],
        //current cateogry
      });

      this.formTitle = this.navParams.get('formTitle');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFormPage');
    this.tasktoEdit = this.navParams.get('task');
    console.log(this.tasktoEdit);
    if(this.tasktoEdit != null)  {
      this.isNew = false;

      //fill form

      this.taskForm.controls['title'].setValue(this.tasktoEdit.title);
      this.taskForm.controls['description'].setValue(this.tasktoEdit.description);
      let curDate = new Date(this.tasktoEdit.dueDate).toISOString();
      this.taskForm.controls['dueDate'].setValue(curDate);

    }
  }
  sendTask() {
    console.log(this.isNew);
    if(this.taskForm.invalid) {
      return;
    }
    console.log(this.taskForm.value)
  }

}
