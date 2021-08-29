import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { MapModalComponent } from 'src/app/shared-modules/map-modal/map-modal.component';
import { environment } from '../../../environments/environment';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { MapForWorkModalComponent } from 'src/app/shared-modules/map-for-work-space-modal/map-modal.component';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  userBrowser = false;
  userMobile = false;

  address: any;
  userCurrentLocationData: any;
  @Output() pickedLocation = new EventEmitter<{location:string, locationObj:string}>();
  mapLocation: any;

  constructor(
    private modelCtrl: ModalController,
    private http: HttpClient,
    private nativeGeocoder: NativeGeocoder,
    private plt: Platform) {
    console.log('Mobile', this.plt.is('mobile'));
    console.log('hybrid', this.plt.is('hybrid'));
    console.log('ios', this.plt.is('ios'));
    console.log('android', this.plt.is('android'));
    console.log('desktop', this.plt.is('desktop'));
    if ((this.plt.is('mobile') && !this.plt.is('hybrid')) || this.plt.is('desktop')) {
      this.userBrowser = true;
    } else if (this.plt.is('hybrid')) {
      this.userMobile = true;
    }
  }

  ngOnInit() { }

  dismiss() {
    this.modelCtrl.dismiss();
  }

  onPickLocation() {
    this.modelCtrl.create({
      component: MapForWorkModalComponent,
    }).then(modelCtrl => {
      modelCtrl.onDidDismiss().then(modelData => {
        if (!modelData.data) {
          return;
        }
        console.log(modelData);
        if(this.userMobile){
          this.getAddressFromCoords(modelData.data.lat, modelData.data.lng);
        } else if (this.userBrowser){
          this.getAddresses(modelData.data.lat, modelData.data.lng);
        }
      });
      modelCtrl.present();
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log('Revearse Geo Code Results', result);
        this.address = '';
        const responseAddress = [];
        for (const value of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        console.log('Single address of Geo Code', result[0]);
        this.userCurrentLocationData = result[0];
        this.mapLocation = result[0].areasOfInterest[0]+' '+result[0].locality + ' ' + result[0].countryName + this.address;
        this.pickedLocation.emit({location: this.mapLocation,locationObj: JSON.stringify(this.userCurrentLocationData)});
        // this.pickedLocation.emit(this.userCurrentLocationData);
        // console.log('selected location: ', this.mapLocation);
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
        console.log(error);
        // this.pickedLocation.emit("Missing biling Not availble on browser");
      });

  }

  private getAddresses(lat: number, lng: number) {
    console.log('lat', lat);
    console.log('lng', lng);

    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsApiKey}`).subscribe(geoData=> {
      console.log(geoData);
      if(!geoData || !geoData.results || geoData.results.length == 0  || geoData.error_message){
        let a1 ={
          longitude : lng,
          latitude : lat,
        }
        this.pickedLocation.emit({location: this.mapLocation,locationObj: JSON.stringify(a1)});
        return null;
      }
      this.address = geoData.results[0].formatted_address;
      this.pickedLocation.emit({location: this.mapLocation,locationObj: JSON.stringify(this.address)});
      return geoData.results[0].formatted_address;
    },err=> {
      console.log(err);
      let a1 ={
        longitude : lng,
        latitude : lat,
      }
      this.pickedLocation.emit({location: this.mapLocation,locationObj: JSON.stringify(a1)});
    })
  }

}
