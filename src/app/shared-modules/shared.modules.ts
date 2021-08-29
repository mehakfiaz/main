import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { MapForWorkModalComponent } from './map-for-work-space-modal/map-modal.component';
@NgModule({

  entryComponents: [
    ProfileComponent,
    LocationPickerComponent,
    MapModalComponent,
    MapForWorkModalComponent,
  ], 
  declarations: [
    ProfileComponent,
    LocationPickerComponent,
    MapModalComponent,
    MapForWorkModalComponent
  ],
  imports: [CommonModule, IonicModule ,FormsModule],
  exports: [LocationPickerComponent],
})

export class SharedModule { }
