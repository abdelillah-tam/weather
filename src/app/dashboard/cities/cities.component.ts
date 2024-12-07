import { Component, OnInit } from '@angular/core';
import { City } from '../../model/city';
import { Store } from '@ngrx/store';
import {
  loadCityWeatherAction,
  stopReloadingAction,
} from '../../store/weather.actions';
import { MatButtonModule } from '@angular/material/button';
import { reloadSelector } from '../../store/weather.selectors';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit {
  cities: string[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getCities();
    this.store.select(reloadSelector).subscribe((data) => {
      if (data) {
        this.getCities();
      }
    });
  }

  getCityWeather(index: number) {
    this.store.dispatch(
      loadCityWeatherAction({ cityName: this.cities[index], loading: true })
    );
  }

  remove(index: number) {
    localStorage.removeItem(this.cities[index]);
    this.getCities();
  }

  private getCities() {
    this.cities = [];
    for (let i = 0; i < localStorage.length; i++) {
      this.cities.push(localStorage.getItem(localStorage.key(i)!)!);
    }
    this.store.dispatch(stopReloadingAction());
  }
}
