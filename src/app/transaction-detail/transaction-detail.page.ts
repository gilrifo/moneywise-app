import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../core/services/transaccion';
import { Transaction } from '../core/models/transaction.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: false
})
export class TransactionDetailPage implements OnInit {

  transaction?: Transaction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.transactionService.transactions$.subscribe(transactions => {
        this.transaction = transactions.find(t => t.id === id);
      });
    }
  }

  async deleteTransaction() {
    if (!this.transaction) return;

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Deseas eliminar esta transacción?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.transactionService.delete(this.transaction!.id);
            this.router.navigate(['/transacciones']);
          }
        }
      ]
    });

    await alert.present();
  }

  async editTransaction() {
    if (!this.transaction) return;

    const alert = await this.alertController.create({
      header: 'Editar Transacción',
      inputs: [
        { name: 'title', type: 'text', value: this.transaction.title, placeholder: 'Descripción' },
        { name: 'amount', type: 'number', value: this.transaction.amount, placeholder: 'Monto' },
        { name: 'type', type: 'text', value: this.transaction.type, placeholder: 'income o expense' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data: any) => {
            await this.transactionService.update({
              ...this.transaction!,
              title: data.title,
              amount: Number(data.amount),
              type: data.type === 'income' ? 'income' : 'expense'
            });

            
            this.transaction = {
              ...this.transaction!,
              title: data.title,
              amount: Number(data.amount),
              type: data.type === 'income' ? 'income' : 'expense'
            };
          }
        }
      ]
    });

    await alert.present();
  }

}