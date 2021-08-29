import { Component, OnInit, Input, ViewChild,Renderer2,ElementRef } from '@angular/core';
import { ModalController, NavController, Platform, ActionSheetController } from '@ionic/angular';
import { LocationPickerComponent } from 'src/app/shared-modules/location-picker/location-picker.component';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss'],
})
export class SingleOrderComponent implements OnInit {
  
  win: any;
  posObj: any;
  googleModule: any; 
  userBrowser = false;
  userMobile = false;
  lat: any;
  lng: any;
  map: any;
  marker:any;
  searchAddress = '';
  @ViewChild('map') mapElementRef: ElementRef;
  
  // Custom Variables
  segmentValue = 'basic';
  @Input() orderId: any;
  locationObj: any;
  orderDetail = {
    address: '',
    lat: 0.0,
    long: 0.0,
  }
  constructor(
    private modalController: ModalController,
    private renderer: Renderer2,
    private plt: Platform,
    private http: HttpClient,
    private geolocation: Geolocation,
    public nav: NavController,
    private actionSheet: ActionSheetController
  ) {
    if ((this.plt.is('mobile') && !this.plt.is('hybrid')) || this.plt.is('desktop')) {
      this.userBrowser = true;
    } else if(this.plt.is('hybrid')) {
      this.userMobile = true;
    }
    this.searchAddress = '';
   }
  ngOnInit() {
    this.getUserLocation();
  }
  private getGoogleMap(): Promise<any>{
    this.win = window as  any;
    this.googleModule = this.win.google;
    if (this.googleModule && this.googleModule.maps){
      return Promise.resolve(this.googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.google.com/maps/api/js?key='+environment.googleMapsApiKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        const loadedGoogleModuel = this.win.google;
        if (loadedGoogleModuel && loadedGoogleModuel.maps){
          resolve(loadedGoogleModuel.maps);
        } else {
          reject("google module SDK Not availble");
        }
      };
    });
  }
  async setMap() {
    await this.getGoogleMap().then( googleMaps => {
      console.log('this is google maps', googleMaps);
      const mapEl = this.mapElementRef.nativeElement;

      this.map = new googleMaps.Map(mapEl, {
        center: {lat: this.lat, lng: this.lng},
        zoom: 16
      });

      googleMaps.event.addListenerOnce(this.map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      });

      this.map.addListener('click', event => {
        console.log(event);
        const selectedCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        this.map.setCenter(this.posObj);
        const icon = {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue.png', // image url
          scaledSize: new this.googleModule.maps.Size(50, 50), // scaled size
        };
        const marker = new this.googleModule.maps.Marker({
          position: this.posObj,
          map: this.map,
          title: 'Hello World!',
          icon: icon
        });
        const contentString = 'Skill Expert'
        const infowindow = new this.googleModule.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }
  async getUserLocation() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      /*location object*/
      this.posObj = {
        lat: this.lat,
        lng: this.lng
      };
      this.setMap();
      console.log('lat', this.lat, 'lng', this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ngAfterViewInit(){
    this.getUserLocation();
  }
  ionViewWillEnter() {

  }
  changeSegment(ev) {
    this.segmentValue = ev.detail.value;
    console.log(this.segmentValue);
    // this.ionViewWillEnter();
  }
  onSearchChange(e){
  }
  onLocationPicked(location: any) {
    console.log('geted location', location);
    this.locationObj = JSON.parse(location.locationObj);
  }
  dismiss() {
    this.modalController.dismiss();
  }
  openActionSheet() {
    this.actionSheet.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
