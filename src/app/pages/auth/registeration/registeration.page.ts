import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.page.html',
  styleUrls: ['./registeration.page.scss'],
})
export class RegisterationPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  signUp() {

  }
  signin() {
    this.router.navigate(['/login']);
  }
}
