import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { AddProduct } from '../model/User.model';
import { PageAndSize } from './data-type';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private _http: HttpClient) {}

  public getUserInformation() {
    return this._http.get(`${environment.serverUrl}/user/getUserInformation`);
  }

  public addSellerProduct(data: any) {
    return this._http.post(
      `${environment.serverUrl}/product/addSellerProduct`,
      data
    );
  }

  public getSellerProduct(data: PageAndSize) {
    return this._http.get(
      `${environment.serverUrl}/product/getSellerProduct?page=${data.page}&size=${data.size}`
    );
  }

  public editSellerProduct(data: any) {
    return this._http.put(
      `${environment.serverUrl}/product/editSellerProduct`,
      data
    );
  }
}
