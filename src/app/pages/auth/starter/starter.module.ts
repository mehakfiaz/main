import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StarterPageRoutingModule } from './starter-routing.module';
import { StarterPage } from './starter.page';
import { SharedModule } from 'src/app/shared-modules/shared.modules';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarterPageRoutingModule,
    SharedModule,
  ],
  declarations: [StarterPage]
})
export class StarterPageModule {}
