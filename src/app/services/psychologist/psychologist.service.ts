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
  // https://www.psonrie.com/api/interview-test/psychologist/bb7a9087-e698-4eeb-b2ec-d5f2355d7d6b
  public getAll() {
    const parameters = {
    };
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-Type',
      'Accept': 'text/json',
      'token': this.apiToken
    };
    return this.http.get( `${this.apiPath}${this.apiVersion}${this.apiPsychologistPath}`,
                          parameters,
                          headers);
  }

  public getById(id: string) {
    const parameters = {
    };
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'Content-Type',
      'Accept': 'application/json',
      'token': this.apiToken
    };
    return this.http.get( `${this.apiPath}${this.apiVersion}${this.apiPsychologistPath}/${id}`,
                          parameters,
                          headers);
  }
}
