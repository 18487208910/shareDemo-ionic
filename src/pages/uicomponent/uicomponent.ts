import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BroadcasterPage } from "../broadcaster/broadcaster";
/**
 * Generated class for the UicomponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uicomponent',
  templateUrl: 'uicomponent.html',
})
export class UicomponentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public bro:BroadcasterPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UicomponentPage');
  }
  fnRece(){
    this.bro.fnRece();
      
      }
      fnSend(){
    this.bro.fnSend();
      }
}
