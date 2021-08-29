import { SharedModule } from 'src/app/shared-modules/shared.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { SingleOrderComponent } from '../single-order/single-order.component';
@NgModule({
  entryComponents: [
    CreateOrderComponent,
    SingleOrderComponent
  ], 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OrderPageRoutingModule
  ],
  declarations: [
    OrderPage,
    CreateOrderComponent,
    SingleOrderComponent,
  ]
})
export class OrderPageModule {}
