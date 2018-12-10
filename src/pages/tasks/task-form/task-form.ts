import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';
import { task } from '../../../app/models/task';
import Lockr from 'lockr';
import { CategoryListPage } from '../../Categories/category-list/category-list';
import { TaskListPage } from '../task-list/task-list';

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  taskForm : FormGroup;
  taskToEdit : task;
  catid : number;

  tasks : task [] = [];

  categories : category[] = [];

  todayDate : string = new Date().toString();
  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder : FormBuilder) {
      //(navCtrl.getPrevious().name)

      this.taskForm = formbuilder.group({
        title : ['',Validators.required],
        description : ['',Validators.required],
        dueDate : ['',Validators.required],
      })

      this.taskToEdit = navParams.get('tas');
      this.catid = navParams.get('catid');

      console.log("datetime : ", this.todayDate)

      this.categories = Lockr.get('categories');
      this.tasks = Lockr.get('tasks');

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

   // this.navCtrl.popToRoot();
   this.navCtrl.push(TaskListPage,{catid:this.catid});
    
  }

  addNew() {
    

    let maxId = 1

    this.taskToEdit = this.taskForm.value;
    if(this.tasks != undefined && this.tasks != null && this.tasks.length !=0) {
      //if it's not empty
      maxId = this.getMax()
      this.taskToEdit.id = maxId;
      this.taskToEdit.catID = this.catid;
      this.tasks.push(this.taskToEdit);
    }

    else {
      this.taskToEdit.id = maxId;
      this.taskToEdit.catID = this.catid
      this.tasks = [this.taskToEdit];


    }




    Lockr.set('tasks',this.tasks);

 
  }

  editTask() {
    let index = this.getCatIndex();
    let taskid = this.taskToEdit.id;
    let catid = this.taskToEdit.catID;
    this.taskToEdit = this.taskForm.value;
    console.log('taskToEdit.id',taskid);
    
    this.tasks[index].id = taskid;
    this.tasks[index].title = this.taskToEdit.title;
    this.tasks[index].description = this.taskToEdit.description;
    this.tasks[index].dueDate = this.taskToEdit.dueDate;
    this.tasks[index].catID = catid;

    Lockr.set('tasks',this.tasks);
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
    }
  }
}
