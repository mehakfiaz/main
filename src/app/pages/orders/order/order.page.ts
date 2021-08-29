import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { SingleOrderComponent } from '../single-order/single-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  segmentValue = 'basic';
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  addOrderRequest(form) {

  }
  onSearchChange(e){
  }
  ionViewWillEnter() {

  }
  changeSegment(ev) {
    this.segmentValue = ev.detail.value;
    console.log(this.segmentValue);
    this.ionViewWillEnter();
  }
  createOrder() {
    this.modalController.create({
      component: CreateOrderComponent,
      componentProps: {
      },
    }).then(model => {
      model.present();
      return model.onDidDismiss();
    }).then(resultdata => {
  });
  }
  singleOrder(orderId) {
    this.modalController.create({
      component: SingleOrderComponent,
      componentProps: {
        orderId: orderId,
      },
    }).then(model => {
      model.present();
      return model.onDidDismiss();
    }).then(resultdata => {
    });
  }
}
