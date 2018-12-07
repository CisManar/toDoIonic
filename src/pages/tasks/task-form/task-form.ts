import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';
import { task } from '../../../app/models/task';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../home/home';

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  taskForm : FormGroup;
  taskToEdit : task;

  testDate: Date = new Date();

  tasks : task [] = [];

  categories : category[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder : FormBuilder,
    private storage : Storage) {

      this.taskForm = formbuilder.group({
        title : ['',Validators.required],
        description : ['',Validators.required],
        dueDate : ['',Validators.required],
        catID : ['',Validators.required]
      })

      this.taskToEdit = navParams.get('tas');

      console.log('par task',this.taskToEdit)

      this.storage.get("categories").then((cats)=>{
        this.categories = cats;

      })

      this.storage.get("tasks").then((tasks)=>{
        this.tasks = tasks;

      })
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
    this.navCtrl.push(HomePage);
  }

  addNew() {
    let maxId = 1

    this.taskToEdit = this.taskForm.value;
    console.log(this.tasks)
    if(this.tasks != null) {
    //if it's empty

      maxId = this.getMax()
      this.taskToEdit.id = maxId;
      this.tasks.push(this.taskToEdit);
    }

    else {


      this.taskToEdit.id = maxId;
      this.tasks = [this.taskToEdit];


    }



    console.log('tt',this.taskToEdit)
    this.storage.set('tasks',this.tasks);
  }

  editTask() {
    let index = this.getCatIndex();
    this.taskToEdit = this.taskForm.value;

    this.tasks[index].title = this.taskToEdit.title;
    this.tasks[index].description = this.taskToEdit.description;
    this.tasks[index].dueDate = this.taskToEdit.dueDate;
    this.tasks[index].catID = this.taskToEdit.catID;

    this.storage.set('tasks',this.tasks);

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
