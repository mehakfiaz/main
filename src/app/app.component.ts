import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  
  constructor(
    private router: Router,
  ) {}
  navigateTo(pageName) {
    this.router.navigate(['/','navigator',pageName]);
  }
  logOut() {
    
  }
}
 