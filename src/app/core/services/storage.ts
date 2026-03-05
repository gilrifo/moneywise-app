import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'   
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

 async set(key: string, value: any) {
  if (!this._storage) throw new Error('Storage no inicializado');
  return await this._storage.set(key, value);
}

  get(key: string) {
    return this._storage?.get(key);
  }

  remove(key: string) {
    return this._storage?.remove(key);
  }

  clear() {
    return this._storage?.clear();
  }
}