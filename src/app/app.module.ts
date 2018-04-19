import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UicomponentPage } from "../pages/uicomponent/uicomponent";
import { TabsPage } from "../pages/tabs/tabs";
import { TabcontentPage } from "../pages/tabcontent/tabcontent";
import { BroadcasterPage } from "../pages/broadcaster/broadcaster";

import { Broadcaster } from '@ionic-native/broadcaster';
//QQ分享
import { QQSDK} from '@ionic-native/qqsdk';
//文件选择上传下载
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
//图片查看
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UicomponentPage,
    TabsPage,
    TabcontentPage,
    BroadcasterPage
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UicomponentPage,
    TabsPage,
    TabcontentPage,
    BroadcasterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QQSDK,
    FileChooser,
    FileTransfer,
    Broadcaster,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
