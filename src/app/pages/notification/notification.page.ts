import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  deleteNotification(notification_id) {

  }
  markAsReadSingleNotification(notification_id) {

  }
  ionViewWillEnter() {

  }
  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  filterItems(ev) {
    
  }

}
