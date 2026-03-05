import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { GuestGuard } from './core/guards/guest.guard';
const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard], 
    loadChildren: () => import('./dashboard/dashboard-module').then(m => m.DashboardModule),
  },
{
  path: 'transacciones',
  canActivate: [AuthGuard],
  loadChildren: () =>
    import('./transacciones/transacciones.module')
      .then(m => m.TransaccionesPageModule),
},
  {
    path: 'transaction-detail/:id',
    loadChildren: () => import('./transaction-detail/transaction-detail.module').then( m => m.TransactionDetailPageModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}