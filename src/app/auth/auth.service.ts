import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environment';
import { Login } from './auth-data-type';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  public loginEcommerceUser(data: Login) {
    return this._http.post<Login>(`${environment.serverUrl}/user/userlogin`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError('An error occurred during login. Please try again later.');
      })
    );
  }
}
