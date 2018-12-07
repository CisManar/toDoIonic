import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {IonicStorageModule} from '@ionic/storage';
import { TestPage } from '../pages/test/test';
import { TaskDetailsPage } from '../pages/Tasks/task-details/task-details';
import { TaskFormPage } from '../pages/Tasks/task-form/task-form';
import { TaskListPage } from '../pages/Tasks/task-list/task-list';
import { CategoryFormPage } from '../pages/Categories/category-form/category-form';
import { CategoryListPage } from '../pages/Categories/category-list/category-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    TaskDetailsPage,
    TaskFormPage,
    TaskListPage,
    CategoryFormPage,
    CategoryListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    TaskDetailsPage,
    TaskFormPage,
    TaskListPage,
    CategoryFormPage,
    CategoryListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
