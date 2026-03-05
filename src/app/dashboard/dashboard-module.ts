import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard-page/dashboard-page.page';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  imports: [
  SharedModule,
    RouterModule.forChild([
      { path: 'dashboard-page', component: DashboardPage }
    ])
  ],
  declarations: [DashboardPage]
})
export class DashboardModule { }
