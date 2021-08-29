import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HelpPageRoutingModule } from './help-routing.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpPage } from './help.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpPageRoutingModule,
    MatExpansionModule,
    MatBadgeModule,
  ],
  declarations: [HelpPage]
})
export class HelpPageModule {}
