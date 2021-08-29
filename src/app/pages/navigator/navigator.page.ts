import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfileComponent } from 'src/app/shared-modules/profile/profile.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.page.html',
  styleUrls: ['./navigator.page.scss'],
})
export class NavigatorPage implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }
  profileView() {
    this.modalController.create({
      component: ProfileComponent,
      componentProps: {
      },
    }).then(modal => {
      modal.present();
    }).then(result_data => {
    });
  }
}
