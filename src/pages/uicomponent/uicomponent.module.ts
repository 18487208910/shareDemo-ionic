import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UicomponentPage } from './uicomponent';

@NgModule({
  declarations: [
    UicomponentPage,
  ],
  imports: [
    IonicPageModule.forChild(UicomponentPage),
  ],
})
export class UicomponentPageModule {}
