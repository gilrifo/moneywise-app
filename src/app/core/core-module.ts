import { NgModule, Optional, SkipSelf } from '@angular/core';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicStorageModule.forRoot(),
  
  ],
  providers: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya fue importado. Importalo solo en AppModule.');
    }
  }
}