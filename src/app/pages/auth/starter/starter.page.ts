import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.page.html',
  styleUrls: ['./starter.page.scss'],
})
export class StarterPage implements OnInit {

  // Custom Variables
  pageNo = 1;

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  nextPage() {
    this.pageNo = this.pageNo + 1;
  }
  backPage() {
    this.pageNo = this.pageNo - 1; 
  }
  loginScreen() {
    this.router.navigate(['/','starter','login']);
  }
}
