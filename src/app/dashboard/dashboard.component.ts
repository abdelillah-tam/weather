import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadCityWeatherAction } from '../store/weather.actions';
import {
  cityWeatherSelector,
  errorSelector,
  loadingSelector,
} from '../store/weather.selectors';
import { InfoComponent } from './info/info.component';
import { City } from '../model/city';
import { CitiesComponent } from "./cities/cities.component";
@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    InfoComponent,
    CitiesComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [],
})
export class DashboardComponent implements OnInit {
  searchFormGroup = new FormGroup({
    searchControl: new FormControl(''),
  });

  private _snackBar = inject(MatSnackBar);

  isLoading = false;

  city: City | undefined;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(cityWeatherSelector).subscribe((result) => {
      this.city = result;
    });

    this.store.select(loadingSelector).subscribe((result) => {
      this.isLoading = result;
    });

    this.store.select(errorSelector).subscribe((result) => {
      if (Number(result) === 404) {
        this._snackBar.open('City not exist', '', { duration: 3000 });
      }
    });

    this.searchFormGroup.controls.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => {
        if (data && data !== this.city?.name) {
          this.city = undefined;
          this.store.dispatch(
            loadCityWeatherAction({ cityName: data, loading: true })
          );
        }
      });
  }
}
