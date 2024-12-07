import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../services/weather.service';
import {
  failedLoadingAction,
  LOAD_WEATHER,
  successLoadingAction,
} from './weather.actions';
import { catchError, exhaustMap, map, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherEffects {
  load$;

  constructor(
    private actions: Actions,
    private weatherService: WeatherService
  ) {
    this.load$ = createEffect(() =>
      this.actions.pipe(
        ofType(LOAD_WEATHER),
        exhaustMap((data: { cityName: string }) => {
          return this.weatherService.searchCity(data.cityName).pipe(
            map((data) => successLoadingAction({ cityObj: data })),
            catchError((err: { error: { cod: number } }) =>
              of(err).pipe(
                map((err) => failedLoadingAction({ error: err.error.cod }))
              )
            )
          );
        })
      )
    );
  }
}
