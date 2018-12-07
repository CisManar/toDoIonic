import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';
import { Storage } from '@ionic/storage';
import { TaskListPage } from '../../Tasks/task-list/task-list';
import { HomePage } from '../../home/home';
/**
 * Generated class for the CategoryFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-form',
  templateUrl: 'category-form.html',
})
export class CategoryFormPage {

  catsForm : FormGroup;
  categories : category[] = [];
  catToEdit : category;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuiler : FormBuilder,
    private storage : Storage) {

      this.catsForm = this.formbuiler.group({
        title : ['',Validators.required],
      });
      this.catToEdit = navParams.get('cat');

      this.storage.get("categories").then((cats)=>{
        this.categories = cats;

      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryFormPage');

    this.fillForm();
  }

  fillForm(){
    if(this.catToEdit==null){
      return;
    }
    this.catsForm.controls['title'].setValue(this.catToEdit.title);

  }
  sendCat() {

    /*
    this.storage.get('categories').then((cats) => {
      this.categories = cats;
    })
    */


//if the categore for add new or edit exist
    if(this.catToEdit==null) {
      this.addNew()
    } else {

      this.editCat()
    }
    this.navCtrl.push(HomePage);

  }

  addNew() {
    let maxId = 1
    //if it's empty
    this.catToEdit = this.catsForm.value;

    if(this.categories != null) {

      maxId = this.getMax()
      this.catToEdit.ID = maxId;
      this.categories.push(this.catToEdit);
    }
    else {


      this.catToEdit.ID = maxId;
      this.categories = [this.catToEdit];


    }


    this.storage.set('categories',this.categories);
  }
  editCat() {
    let index = this.getCatIndex();
    this.catToEdit.title = this.catsForm.controls['title'].value;

    this.categories[index].title = this.catToEdit.title;
    this.storage.set('categories',this.categories);

  }
  getCatIndex() {

    for(let i=0;i<this.categories.length;i++) {
      if(this.catToEdit.ID == this.categories[i].ID) {
        return i;
      }

    }

  }

  getMax(){

    let id :number ;
    let length = this.categories.length -1;
    id = this.categories[length].ID;
    return id+1;
  }
}
