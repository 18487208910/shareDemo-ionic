import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the BroadcasterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-broadcaster',
  templateUrl: 'broadcaster.html',
})
export class BroadcasterPage {
  private  subscription:Subscription;
  private i =0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private broadcaster: Broadcaster) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BroadcasterPage');
  }


  fnSend(){
    this.broadcaster.fireNativeEvent('recivedata', {"data":'123456'})
    .then((event) => {
     
    })
  }

  fnRece(){
    if( this.subscription &&  !this.subscription.closed ) return;
    let a = this.i++;
    this.subscription =   this.broadcaster.addEventListener('senddata')
    .subscribe((event) =>{
      alert(JSON.parse(event['resultdata']).resultcode+'--'+a);
    })
 

  }


  onUnregisterListener() {
    if( !this.subscription || this.subscription.closed ) return;
    alert('unsubscribe');
    this.subscription.unsubscribe();
  }

  }

 

