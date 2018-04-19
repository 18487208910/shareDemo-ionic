import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImageViewerController } from 'ionic-img-viewer';
import { UicomponentPage } from '../uicomponent/uicomponent';
import { TabsPage } from '../tabs/tabs';
import { BroadcasterPage } from '../broadcaster/broadcaster';
declare let WeiboSDK;
declare let Wechat;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 

  private isUpload= true;

  private imgsrc ="";

  private uri = "";

  private durl = "";

  private testdiv =[1,2,3,4,5,6,7,8,9];
  constructor(public navCtrl: NavController,
    private qq: QQSDK,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private loadingCtrl: LoadingController,
    private file: File,
   ) {  
   }  


/**
 * 下拉刷新
 * 
 * @param {any} refresher 
 * @memberof HomePage
 */
doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
/**
 * 常见UI组价
 * 
 * @memberof HomePage
 */
fngoui(){
  this.navCtrl.push(UicomponentPage);
   }

/**
 * tabs展示
 * 
 * @memberof HomePage
 */
fngotaps(){
  this.navCtrl.push(TabsPage);
   }

/**
 * 选择文件
 * 
 * @memberof HomePage
 */
fnSelectfile(){
  this.fileChooser.open()
  .then((uri) => {
    this.isUpload = false;
    // alert(uri);
    this.uri = uri;
  
  })
  .catch((e) => {
    alert(e)});
  }

/**
 * 开始上传文件
 * 
 * @memberof HomePage
 */
fndoUpload(){
  this.fnUpload(this.uri,"http://192.168.3.101:9090/common/addPic");
  }
/**
 * 文件上传
 * 
 * @param {any} uri 文件地址
 * @memberof HomePage
 */
fnUpload(uri,url){
// alert("upload");
const fileTransfer: FileTransferObject = this.transfer.create();
let options: FileUploadOptions = {
  fileKey: 'file',
  fileName: 'name.jpg',
  headers: {
    "authorization":"5052ab62-9116-46e8-956d-9e5abd83fade"
  }
}

let loading = this.loadingCtrl.create({
    content:'正在上传',
    dismissOnPageChange:false
});
loading.present();

let now:number = 0;

fileTransfer.onProgress((progressEvevt)=>{
  if(progressEvevt.lengthComputable){
        //  alert(progressEvevt.loaded / progressEvevt.total);
         now = progressEvevt.loaded / progressEvevt.total * 100;
         
  }else{

  }
});
let timer = setInterval(()=>{
  loading.setContent("上传进度:" + Math.floor(now) + "%");
  if(now >= 99){
    clearInterval(timer);
  }
},30);

fileTransfer.upload(uri, url, options)
.then((data:any) => {
  // success
if(JSON.parse(data.response).code == 100){
  loading.dismiss();
 this.isUpload = true;
  this.imgsrc = JSON.parse(data.response).content;
}else{}
      
}, (err) => {
  // error
  alert('2'+err);
  alert('2'+JSON.stringify(err));

})

  }

fnDownload(){
  const url = 'https://img4.duitang.com/uploads/item/201308/04/20130804024028_rZEMa.jpeg';
  const fileTransfer: FileTransferObject = this.transfer.create();

  let loading = this.loadingCtrl.create({
    content:'正在下载',
    dismissOnPageChange:false
});
loading.present();

let now:number = 0;

fileTransfer.onProgress((progressEvevt)=>{
  if(progressEvevt.lengthComputable){
        //  alert(progressEvevt.loaded / progressEvevt.total);
         now = progressEvevt.loaded / progressEvevt.total * 100;
         
  }else{

  }
});
let timer = setInterval(()=>{
  loading.setContent("下载进度:" + Math.floor(now) + "%");
  if(now >= 99){
    clearInterval(timer);
  }
},30);


  fileTransfer.download(url, this.file.dataDirectory+'onepice.jpeg').then((entry) => {
    console.log  ('download complete: ' + entry.toURL());
    loading.dismiss();
    this.durl = entry.toURL();
  }, (error) => {
    alert(JSON.stringify(error));
  });
}


fndoBroadcaster(){
  this.navCtrl.push(BroadcasterPage);
}







  shareWxTimeLine(){

  alert('shareWxTimeLine');
        Wechat.share({
          message: {
            title: '魔镜,让你体验不一样的美发',
            description: '魔镜,让你体验不一样的美发',
            thumb: 'http://img4.duitang.com/uploads/item/201308/04/20130804024028_rZEMa.jpeg',
            media: {
                type: Wechat.Type.LINK,
                webpageUrl: 'http://stream20.qqmusic.qq.com/30577158.mp3',
            }
        },
            scene: Wechat.Scene.SESSION   // share to SESSION
        }, function () {
          alert('分享成功')
        }, function (reason) {
          alert("Failed: " + reason);
        });

      }









  shareWxSession(){
    
    Wechat.isInstalled(function (installed) {
      if(installed){
      
        Wechat.share({
          message: {
              title: '魔镜,让你体验不一样的美发',
              description: '魔镜,让你体验不一样的美发',
              thumb: 'http://img4.duitang.com/uploads/item/201308/04/20130804024028_rZEMa.jpeg',
              media: {
                  type: Wechat.Type.LINK,
                  webpageUrl: 'http://stream20.qqmusic.qq.com/30577158.mp3',
              }
          },
              scene: Wechat.Scene.SESSION   // share to SESSION
          }, function () {
             alert('分享成功');
          }, function (reason) {
              alert("Failed: " + reason);
          });
      }
    }, function (reason) {
      alert("Failed: " + reason);
    });

   
  }

  shareWb(){
    alert('share');
   
    WeiboSDK.checkClientInstalled( ()=> {
      alert('client is installed');

     
        var args:any = {};
      args.url = 'https://www.baidu.com/';
      args.title = '魔镜,让你体验不一样的美发';
      args.description = '魔镜,让你体验不一样的美发';
      args.image = 'http://img4.duitang.com/uploads/item/201308/04/20130804024028_rZEMa.jpeg';//if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
      WeiboSDK.shareToWeibo( ()=> {
          alert('分享成功');
      }, (failReason)=> {
          alert('分享失败'+failReason);
      }, args);


   }, function () {
      alert('client is not installed');
   });
  }

  shareQZone(){
    let qq = (<any>window).QQSDK;
    qq.checkClientInstalled(()=> {
          var args:any = {};
          args.scene = qq.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
          args.url = 'https://www.baidu.com/';
          args.title = '魔镜,让你体验不一样的美发';
          args.description = '魔镜,让你体验不一样的美发';
          args.image = 'http://1876p33v89.iok.la:1024/'+this.imgsrc;
          qq.shareNews(function () {
              alert('分享成功');
          }, function (failReason) {
              alert(failReason);
          },args);
      }, function () {
      // if installed QQ Client version is not supported sso,also will get this error
          this.toastService.show('您没有安装QQ！');
      });
    }




  fnShareNews(){
    alert('share');
    const options: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      scene: this.qq.Scene.QQ,
      title: '魔镜,让你体验不一样的美发',
      url: 'https://www.baidu.com/',
      image: 'http://1876p33v89.iok.la:1024/'+this.imgsrc,
      description: '魔镜,让你体验不一样的美发！！！！',
      flashUrl:  'http://stream20.qqmusic.qq.com/30577158.mp3',
    };
    const clientOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
    };
    
    const shareTextOptions: QQShareOptions = {
      client: this.qq.ClientType.QQ,
      text: 'This is Share Text',
      scene: this.qq.Scene.QQ,
    };
    this.qq.shareNews(options)
    .then(() => {
      alert('分享成功');
       console.log('shareNews success');
    })
    .catch(error => {
      alert('分享失败'+error);
       console.log(error);
    });
 }

  }

