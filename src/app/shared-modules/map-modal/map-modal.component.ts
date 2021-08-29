import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, Platform } from '@ionic/angular';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit , AfterViewInit{
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

  constructor(
    private modelCtrl: ModalController, 
              private renderer: Renderer2,
              private plt: Platform,
              private http: HttpClient,
              private geolocation: Geolocation) { 
    console.log('Mobile', this.plt.is('mobile'));
    console.log('hybrid', this.plt.is('hybrid'));
    console.log('ios', this.plt.is('ios'));
    console.log('android', this.plt.is('android'));
    console.log('desktop', this.plt.is('desktop'));
    if ((this.plt.is('mobile') && !this.plt.is('hybrid')) || this.plt.is('desktop')) {
      this.userBrowser = true;
    } else if(this.plt.is('hybrid')) {
      this.userMobile = true;
    }
    this.searchAddress = '';
  }

  ngOnInit() {}
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
        // const contentString = '<div id="content">' +
        //     '<div id="siteNotice">' +
        //     '</div>' +
        //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        //     '<div id="bodyContent">' +
        //     '<img src="assets/icon/user.png" width="200">' +
        //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        //     'sandstone rock formation in the southern part of the ' +
        //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        //     'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        //     'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        //     'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        //     'Aboriginal people of the area. It has many springs, waterholes, ' +
        //     'rock caves and ancient paintings. Uluru is listed as a World ' +
        //     'Heritage Site.</p>' +
        //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        //     '(last visited June 22, 2009).</p>' +
        //     '</div>' +
        //     '</div>';
        const contentString = 'Skill Expert'
        const infowindow = new this.googleModule.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
        // this.modelCtrl.dismiss(selectedCoords);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  dismiss(){
    this.modelCtrl.dismiss();
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


  searchLocation() {
    if(!this.searchAddress)return;
    console.log(this.searchAddress);
    this.searchApi(this.searchAddress);
  }

  searchApi(query){
    const url = 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + query + '&limit=3&apiKey=dcb06cb71c704af39e964e8ee6f2dbb1';
    this.http.get(url).subscribe(data => {
      let result = data as any;
      if(result.features.length){
          let totalAddress = result.features[0].properties;
          this.placeMarker(new this.googleModule.maps.LatLng({lat:  totalAddress.lat, lng: totalAddress.lon}));
          //this.getAddressFromCoords(totalAddress.lat, totalAddress.lon);
          // $('#p_address_map').val(totalAddress.formatted);

      }
    });
  }

  placeMarker(location) {
    console.log(location);

    this.lat = location.lat();
    this.lng = location.lng();

    //this.getAddressFromCoords(location.lat(), location.lng());

    if (this.marker == undefined) {
      this.marker =new this.googleModule.maps.Marker({
        position: location,
        map: this.map,
        animation: this.googleModule.maps.Animation.DROP,
      });
    } else {
      this.marker.setPosition(location);
    }
    this.map.setCenter(location);
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.placeMarker(new this.googleModule.maps.LatLng({lat:  resp.coords.latitude, lng:  resp.coords.longitude}));
        //this.getAddressFromCoords(resp.coords.latitude,  resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  selectMap(){
    const selectedCoords = {
      lat: this.lat,
      lng: this.lng
    };
    this.modelCtrl.dismiss(selectedCoords);
  }


}
