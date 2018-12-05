import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsPage } from '../pages/tasks/task-details/task-details';
import { TaskFormPage } from '../pages/tasks/task-form/task-form';
import { CategorylistPage } from '../pages/categories/categorylist/categorylist';
import { CategoryformPage } from '../pages/categories/categoryform/categoryform';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TaskDetailsPage,
    TaskFormPage,
    CategorylistPage,
    CategoryformPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TaskDetailsPage,
    TaskFormPage,
    CategorylistPage,
    CategoryformPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
