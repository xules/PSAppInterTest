import { Injectable } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Psychologist } from 'src/app/interfaces/psychologist/psychologist';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
  apiPath = environment.api.path;
  apiVersion = environment.api.version;
  apiToken = environment.api.token;
  apiPsychologistPath = '/psychologist';

  constructor(
    private http: HTTP
  ) {

  }

  public getAll() {
    const parameters = {
    };
    return this.http.get( `${this.apiPath}${this.apiVersion}${this.apiPsychologistPath}`,
                          parameters,
                          this.getHeaders('GET'));
  }

  public getById(id: string) {
    const parameters = {
    };
    return this.http.get( `${this.apiPath}${this.apiVersion}${this.apiPsychologistPath}/${id}`,
                          parameters,
                          this.getHeaders('GET'));
  }

  getHeaders(method: string){
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
