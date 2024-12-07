import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _apiKey = environment.openWeatherApi.API_KEY;
  private _baseUrl = environment.openWeatherApi.BASE_URL;

  constructor(private httpClient: HttpClient) {}

  searchCity(cityName: string) {
    return this.httpClient
      .get<City>(
        `${this._baseUrl}?q=${cityName}&units=metric&appid=${this._apiKey}`
      );
  }
}
