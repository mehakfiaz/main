import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  // Custom Variables
  counter = 1;
  constructor() { }

  ngOnInit() {
  }

  onSearchChange(e){
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
  add() {
    this.counter = this.counter + 1;
  }
  minus(){
    if(this.counter == 0) {
      this.counter = 1;
    } else {
      this.counter = this.counter - 1;
    }
  }
}
