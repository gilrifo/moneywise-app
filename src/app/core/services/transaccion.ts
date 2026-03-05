import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage';
import { Transaction } from '../models/transaction.model';

const STORAGE_KEY = 'moneywise_transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor(private storageService: StorageService) { }

  async init() {
    const stored = await this.storageService.get(STORAGE_KEY);
    this.transactionsSubject.next(stored ?? []);
  }

  async add(title: string, amount: number, type: 'income' | 'expense', photo?: string) {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title,
      amount,
      type,
      date: new Date().toISOString(),
      photo
    };
    const current = this.transactionsSubject.value;
    const updated = [newTransaction, ...current];
    await this.storageService.set(STORAGE_KEY, updated);
    this.transactionsSubject.next(updated);
  }

  async update(transaction: Transaction) {
    const transactions = this.transactionsSubject.value;
    const index = transactions.findIndex(t => t.id === transaction.id);
    if (index !== -1) {
      transactions[index] = { ...transaction };
      await this.storageService.set(STORAGE_KEY, transactions);
      this.transactionsSubject.next([...transactions]);
    }
  }

  async delete(id: string) {
    const current = this.transactionsSubject.value;
    const updated = current.filter(t => t.id !== id);
    await this.storageService.set(STORAGE_KEY, updated);
    this.transactionsSubject.next(updated);
  }

  getBalance(): number {
    return this.transactionsSubject.value.reduce((total, t) => {
      return t.type === 'income' ? total + t.amount : total - t.amount;
    }, 0);
  }


  
}