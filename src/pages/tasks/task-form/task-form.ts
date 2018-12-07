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
  taskToEdit : task;

  testDate: Date = new Date();

  tasks : task [] = [
    {id:1,title:"go to gym",description:"dddd",dueDate:this.testDate,catID:1},
    {id:2,title:"go to gymaa",description:"dddd",dueDate:this.testDate,catID:3},
  ];

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
    this.taskForm.controls['description'].setValue(this.taskToEdit.description);
    this.taskForm.controls['dueDate'].setValue(new Date(this.taskToEdit.dueDate).toISOString());
    this.taskForm.controls['catID'].setValue(this.taskToEdit.catID);

  }
  sendTask() {

    if(this.taskForm.invalid) {
      return;
    }

    if(this.taskToEdit==null){
      this.addNew();
    } else {
      this.editTask();
    }

  }

  addNew() {

    let maxId = 1
    //if it's empty
    this.taskToEdit = this.taskForm.value;

    if(this.categories.length != 0) {

      maxId = this.getMax()
    }

    this.taskToEdit.id = maxId;
    this.tasks.push(this.taskToEdit);

    console.log(this.tasks)
  }

  editTask() {
    let index = this.getCatIndex();
    this.taskToEdit = this.taskForm.value;

    this.tasks[index].title = this.taskToEdit.title;
    this.tasks[index].description = this.taskToEdit.description;
    this.tasks[index].dueDate = this.taskToEdit.dueDate;
    this.tasks[index].catID = this.taskToEdit.catID;

    console.log('after edit' , this.tasks)

  }

  getMax(){

    let id :number ;
    let length = this.tasks.length -1;
    id = this.tasks[length].id;
    return id+1;
  }

  getCatIndex() {
    for(let i=0;i<this.tasks.length;i++) {
      if(this.taskToEdit.id == this.tasks[i].id) {
        return i;
      }
      break;

    }
  }
}
