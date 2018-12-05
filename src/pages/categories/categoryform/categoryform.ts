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

  isNew : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formbuiler:FormBuilder) {

    this.catsForm = this.formbuiler.group({
      title : ['',Validators.required],
      //current cateogry
    });

    this.formTitle = this.navParams.get('formTitle');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryformPage');
  }

}
