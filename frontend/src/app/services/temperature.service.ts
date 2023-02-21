import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) { }

  getTemperatureAndHumidity(): Promise<any> {
    return this.http.get<any>(`${environment.baseUrl}/get-temperature`).toPromise();
  }
}
