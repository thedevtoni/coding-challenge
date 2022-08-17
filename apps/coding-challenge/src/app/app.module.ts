import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { USERS_API_URL } from '@coding-challenge/services/users';
import { environment } from '../environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  CheckCircleTwoTone,
  LockOutline,
  MailOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { AppComponent } from './app.component';

const icons: IconDefinition[] = [
  LockOutline,
  UserOutline,
  MailOutline,
  CheckCircleTwoTone,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [
    {
      provide: USERS_API_URL,
      useValue: environment.api.users,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
