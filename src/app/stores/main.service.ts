import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { AddProduct } from '../model/User.model';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private _http: HttpClient) {}

  public getUserInformation() {
    return this._http.get(
      `${environment.serverUrl}/user/getUserInformation`
    );
  }

  public addSellerProduct(data:any){
    return this._http.post(
      `${environment.serverUrl}/product/addSellerProduct`,
      data
    );
  }
}
