import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';
import { task } from '../../../app/models/task';
import Lockr from 'lockr';
import { CategoryListPage } from '../../Categories/category-list/category-list';
import { TaskListPage } from '../task-list/task-list';
import * as $ from "jquery";


@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  taskForm: FormGroup;
  taskToEdit: task;
  categoryId: number;

  tasks: task[] = [];

  tags = [];

  categories: category[] = [];

  todayDate: string = new Date().toString();
  previousPage: any;
  
  @ViewChild('description') description: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuilder: FormBuilder,
    private events: Events,) {
    //(navCtrl.getPrevious().name)

    this.taskForm = formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      tags: ['']
    })

    this.taskToEdit = navParams.get('tas');
    this.categoryId = navParams.get('categoryId');



    this.categories = Lockr.get('categories');
    this.tasks = Lockr.get('tasks');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFormPage');

    this.tags = ['Ionic', 'Angular', 'TypeScript'];

    if (this.taskToEdit == null) {
      return;
    }
    this.taskForm.controls['title'].setValue(this.taskToEdit.title);
    this.taskForm.controls['description'].setValue(this.taskToEdit.description);
    this.taskForm.controls['dueDate'].setValue(new Date(this.taskToEdit.dueDate).toISOString());

    
  }

  resize() {
    this.description.nativeElement.style.height = this.description.nativeElement.scrollHeight + 'px';
  }
  onChange(val) {
    console.log(this.tags)
  }

  save() {

    if (this.taskForm.invalid) {
      return;
    }

    if (this.taskToEdit == null) {

      this.addNew();

    } else {

      this.editTask();

    }


  }

  addNew() {

    let maxId = 1

    this.taskToEdit = this.taskForm.value;
    if (this.tasks != undefined && this.tasks != null && this.tasks.length != 0) {
      //if it's not empty
      maxId = this.getMax()
      this.taskToEdit.id = maxId;
      this.taskToEdit.catID = this.categoryId;
      console.log("task before push:", this.taskToEdit)
      this.tasks.push(this.taskToEdit);
    }

    else {
      this.taskToEdit.id = maxId;
      this.taskToEdit.catID = this.categoryId
      this.tasks = [this.taskToEdit];


    }
    Lockr.set('tasks', this.tasks);
    this.redirectToPage(this.taskToEdit.catID);

  }

  editTask() {
    let index = this.getCatIndex();
    let taskid = this.taskToEdit.id;
    let catid = this.taskToEdit.catID;
    this.taskToEdit = this.taskForm.value;

    this.tasks[index].id = taskid;
    this.tasks[index].title = this.taskToEdit.title;
    this.tasks[index].description = this.taskToEdit.description;
    this.tasks[index].dueDate = this.taskToEdit.dueDate;
    this.tasks[index].catID = catid;

    Lockr.set('tasks', this.tasks);

    this.redirectToPage(catid);
  }

  redirectToPage(categoryID) {

    this.events.publish('task:details', this.taskToEdit, this.categoryId);

    this.navCtrl.pop();
    this.navCtrl.pop();

    this.navCtrl.push(TaskListPage).then(() => {
      this.events.publish('task:list', categoryID, this.tasks, true);
    })
    //{tasks:this.tasks,tas:this.taskToEdit,catid:this.catid}

    /*
    this.previousPage = this.navCtrl.getPrevious().name;

    let index = this.navCtrl.getActive().index;
   this.navCtrl.push(TaskListPage,{catid:this.catid}).then(()=> {
    
     this.navCtrl.remove(1,index);
   })
   */
  }
  getMax() {

    let id: number;
    let length = this.tasks.length - 1;
    id = this.tasks[length].id;
    return id + 1;
  }

  getCatIndex() {

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.taskToEdit.id == this.tasks[i].id) {
        return i;
      }
    }
  }

}
