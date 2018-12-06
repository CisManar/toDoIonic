import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { category } from '../../../app/models/category';

/**
 * Generated class for the CategoryformPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoryform',
  templateUrl: 'categoryform.html',
})
export class CategoryformPage {

  formTitle : string;
  catsForm : FormGroup;
  cattoEdit : category;
  categories : category[] = [];

  isNew : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuiler:FormBuilder) {

    this.catsForm = this.formbuiler.group({
      title : ['',Validators.required],
      //current cateogry
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryformPage');
    this.cattoEdit = this.navParams.get('cat');
    if(this.cattoEdit!=null) {
      this.catsForm.controls['title'].setValue(this.cattoEdit.title);
    }
    console.log("cats from form before:",this.categories);


   
  }

  sendTask() {
    let cat : category = {ID:null , title: this.catsForm.controls['title'].value };
   
    this.addCat(cat);
    if(this.cattoEdit==null) { //add
      
      cat.ID = 1;


      this.categories.push(cat);

      console.log("cats from form after:",this.categories);
    }
    else { //edit
      let lastIndex = this.categories.length-1;
      let max : number = this.categories[lastIndex].ID + 1;

    }
  }

  addCat(cat:category) {
    console.log("arr check", this.categories)
    if(this.categories.length === 0) {
      alert("empty")
    } else {
      alert("Full")
    }
  }

}
