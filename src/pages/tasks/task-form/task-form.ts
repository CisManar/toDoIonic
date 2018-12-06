import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { task } from '../../../app/models/task';
import { Storage } from '@ionic/storage'
import { HomePage } from '../../home/home';

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
  tasks : task[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private formbuiler:FormBuilder,
     private storage : Storage) {

      this.taskForm = this.formbuiler.group({
        title : ['',Validators.required],
        description : ['',Validators.required],
        dueDate : ['',Validators.required],
        //current cateogry
      });

      this.formTitle = this.navParams.get('formTitle');
  }

  ionViewDidLoad() {

    this.tasktoEdit = this.navParams.get('task');

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
    let task = this.taskForm.value;

    if(this.taskForm.invalid) {
      return;
    }
    
    if(this.isNew) {
      let max = this.tasks.length-1
      let newTask : task = {
        id : 1,
        title : task.title,
        description : task.description,
        dueDate : task.dueDate,
        catID : 1 ,
        isDone : false
      }
      
      this.addNewTask(newTask);

    }
    else {
      
      let index = this.getTaskIndexById(this.tasktoEdit.id);
      this.editTask(index,task)
    }

    this.navCtrl.push(HomePage);
  }

  setTaskStorage() {
    this.storage.set("Tasks", this.tasks);
  }
  getTaskStorage() {
    this.storage.get('Tasks').then((t) => {
      return t;
    })
  }
  addNewTask(newTask:task) {
    this.getTaskStorage();
    this.tasks.push(newTask);
    this.setTaskStorage()
  }
  editTask(index : number , task : task) {
    let tasks = this.getTaskStorage();

    tasks[index].title = task.id;
    tasks[index].description = task.description;
    tasks[index].dueDate = task.dueDate;
    tasks[index].catID = task.catID;

    this.setTaskStorage()

  }
  getTaskIndexById(id:number) {
    console.log("tasks index: ", this.tasks)

    for(let i=0;i<this.tasks.length;i++) {
      if(this.tasks[i].id == id){
        return i;
      }
    }
  }
}
