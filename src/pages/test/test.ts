import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  arr = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage : Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');

    this.storage.get("ionicarrs").then((d)=>{
      this.arr = d;
      console.log(this.arr)
    })
  }

  add() {

    this.storage.get("ionicarrs").then((d)=>{
      this.arr = d;
      console.log(this.arr)

    })
    this.arr.push({a:1,b:2});

    this.storage.set('ionicarrs',this.arr);

  }
}
