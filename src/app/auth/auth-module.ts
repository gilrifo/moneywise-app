import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [
   SharedModule,  
    RouterModule.forChild([
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage }
    ])
  ],
  declarations: [LoginPage, RegisterPage]
})
export class AuthModule {}