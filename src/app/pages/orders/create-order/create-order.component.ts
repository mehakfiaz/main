import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/server-configration-and-apis/toast.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  // Custom Variables
  serviceType: any;
  customerName: any;
  customerEmail: any;
  customerPhoneNo: any;
  customerDeliveryDate: any;
  customerDeliveryTime: any;
  customerAddress: any;
  screenNo = 1;
  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private toast: ToastService,
  ) { }

  ngOnInit() {}
  async addOrderRequest(form) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Check Out',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delivery',
          handler: () => {
            console.log('Play clicked');
           
          },
        },
        {
          text: 'Payment',
          handler: () => {
            console.log('Play clicked');
           
          },
        },
        {
          text: 'Promo Code',
          handler: () => {
            console.log('Play clicked');
           
          },
        },
        {
          text: 'Total Cost',
          handler: () => {
            console.log('Play clicked');
           
          },
        },
        {
          text: 'By Pricing on Order you agree to our Term And Condition',
          handler: () => {
            console.log('Play clicked');
           
          },
        },
        {
          text: 'Place Order',
          role: 'cancel',
          handler: () => {
            this.nextScreen();
          },
        },
      ],
    });
    await actionSheet.present();
  }
  dismiss() {
    this.modalController.dismiss();
  }
  nextScreen() {
    this.toast.SuccessToast('Order Placed Success Fully', 1000);
    this.screenNo = 2;
  }
  onLocationPicked(location: any) {
    this.dismiss();
    console.log('geted location', location);
    // this.locationObj = JSON.parse(location.locationObj);
  }
}
