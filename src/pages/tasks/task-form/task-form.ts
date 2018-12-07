import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';
import { task } from '../../../app/models/task';

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  taskForm : FormGroup;
  taskObj : task;
  taskToEdit : task;

  categories : category[] = [
    {ID:1,title:"MMM"},
    {ID:3,title:"nn"}

  ]
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder : FormBuilder) {

      this.taskForm = formbuilder.group({
        title : ['',Validators.required],
        description : ['',Validators.required],
        dueDate : ['',Validators.required],
        catID : ['',Validators.required]
      })

      this.taskToEdit = navParams.get('tas');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFormPage');
    this.fillForm();

  }
  fillForm(){
    if(this.taskToEdit==null){
      return;
    }
    this.taskForm.controls['title'].setValue(this.taskToEdit.title);
    this.taskForm.controls['description'].setValue(this.taskToEdit.title);
    this.taskForm.controls['dueDate'].setValue(new Date(this.taskToEdit.dueDate).toISOString());
    this.taskForm.controls['catID'].setValue(this.taskToEdit.catID);

  }
  sendTask() {
    if(this.taskToEdit==null){
      alert('add')
    } else {
      alert('edit')
    }
    this.taskObj = this.taskForm.value;
    console.log(this.taskObj);
  }
}
