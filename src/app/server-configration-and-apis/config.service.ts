import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // static SERVER_ADDRESS = 'http://192.236.147.77:8084';
  // static WORKSPACE = 'workflow/';
  // static SERVER_ADDRESS = 'http://workflow';
 
  // static SERVER_ADDRESS = 'http://34.74.208.114'; http://172.28.52.25/sodasalf/
  // static SERVER_ADDRESS = 'http://localhost/arabianceramics'
  static SERVER_ADDRESS = 'http://sodasulf.iibtech.com';

  // http://localhost/arabianceramics/rest/default/V1/integration/customer/token
  static WORKSPACE = 'rest/default/V1/';

  public get SERVER(): string{
    return ConfigService.SERVER_ADDRESS;
  }

  public get SERVER_API(): string {
    return this.SERVER + '/' + ConfigService.WORKSPACE;
  }
  constructor() { }
}
