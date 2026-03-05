import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../core/services/transaccion';
import { Transaction } from '../core/models/transaction.model';
import { Observable } from 'rxjs';
import { AlertController, SegmentChangeEventDetail } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CameraService } from '../core/services/camera';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.page.html',
  styleUrls: ['./transacciones.page.scss'],
  standalone: false
})
export class TransaccionesPage implements OnInit {
  form!: FormGroup;
  filteredTransactions$!: Observable<Transaction[]>;
  selectedFilter: 'all' | 'income' | 'expense' = 'all';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['expense', Validators.required],
      photo: ['']
    });

    this.filteredTransactions$ = this.transactionService.transactions$.pipe(
      map(transactions => this.filterTransactions(transactions))
    );

    
    this.transactionService.transactions$.subscribe(transactions => {
      this.filteredTransactions$ = this.transactionService.transactions$.pipe(
        map(() => this.filterTransactions(transactions))
      );
    });
  }

  private filterTransactions(transactions: Transaction[]): Transaction[] {
    if (this.selectedFilter === 'all') return transactions;
    return transactions.filter(t => t.type === this.selectedFilter);
  }

  setFilter(filter: 'all' | 'income' | 'expense') {
    this.selectedFilter = filter;
    this.transactionService.transactions$.subscribe(transactions => {
      this.filteredTransactions$ = this.transactionService.transactions$.pipe(
        map(() => this.filterTransactions(transactions))
      );
    });
  }

  async add() {
    if (this.form.invalid) return;

    const { title, amount, type, photo } = this.form.value;
    await this.transactionService.add(title, Number(amount), type, photo || '');
    this.form.reset({ type: 'expense' });

    const toast = await this.toastController.create({
      message: '✅ Transacción agregada correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  async delete(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Seguro que deseas eliminar esta transacción?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.transactionService.delete(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.form.patchValue({ photo: photo.dataUrl });
    } catch (err) {
      console.error('Error tomando foto:', err);
    }
  }

  onFilterChange(event: CustomEvent<SegmentChangeEventDetail>) {
  const value = event.detail.value as 'all' | 'income' | 'expense' | undefined;
  if (value) {
    this.setFilter(value);
  }
}
}