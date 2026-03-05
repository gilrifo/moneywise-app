import { Component } from '@angular/core';
import { StorageService } from './core/services/storage';
import { AuthService } from './core/services/auth';
import { TransactionService } from './core/services/transaccion';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
  private storageService: StorageService,
  private authService: AuthService,
  private transactionService: TransactionService
) {
  this.initApp();
}

async initApp() {
  await this.storageService.init();
  await this.authService.init();
   await this.transactionService.init();
}
}
