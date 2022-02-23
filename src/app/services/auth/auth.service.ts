import { Injectable } from '@angular/core';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BehaviorSubject } from 'rxjs';
// import { HttpClient} from '@angular/common/http';
// private httpClient: HttpClient

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiPath = environment.api.path;
  apiVersion = environment.api.version;
  apiToken = environment.api.token;
  apiLoginPath = '/login';

  authenticationState = new BehaviorSubject(false);
  userLogged: boolean = false;


  constructor(
    private http: HTTP
  ) {

  }
  /**
   * Login en la api de PSonrie con HTTP.
   * @param user usuario
   * @param password clave de acceso
   * @returns Promise<any>
   */
  login(user: string, password: string): Promise<any> {
    const postData = {
      username: user,
      password
    };
    return this.http.post(`${this.apiPath}${this.apiVersion}${this.apiLoginPath}`,
      postData,
      this.getHeaders('POST'));
  }

  isUserLogged() {
    this.userLogged;
  }
  setUserLogged(userLogged: boolean) {
    this.authenticationState.next(userLogged);
    this.userLogged = userLogged;
  }

  getHeaders(method: string) {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Request-Method': method,
      'Access-Control-Request-Headers': 'Content-Type',
      'Accept': 'application/json',
      'token': this.apiToken
    };
    return headers;
  }
}
