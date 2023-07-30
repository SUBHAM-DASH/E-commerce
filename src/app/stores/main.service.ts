import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';

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
}
