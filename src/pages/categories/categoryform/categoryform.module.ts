import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryformPage } from './categoryform';

@NgModule({
  declarations: [
    CategoryformPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryformPage),
  ],
})
export class CategoryformPageModule {}
