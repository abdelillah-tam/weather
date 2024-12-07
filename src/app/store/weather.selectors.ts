import { createFeatureSelector, createSelector } from '@ngrx/store';
import { City } from '../model/city';

const weatherFeatureSelector = createFeatureSelector<{
  city: City | undefined;
  loading: boolean;
  error: number | undefined;
  reloadAddedCities: boolean;
}>('weatherReducer');

export const cityWeatherSelector = createSelector(
  weatherFeatureSelector,
  (state) => state.city
);

export const loadingSelector = createSelector(
  weatherFeatureSelector,
  (state) => state.loading
);

export const errorSelector = createSelector(
  weatherFeatureSelector,
  (state) => state.error
);

export const reloadSelector = createSelector(
  weatherFeatureSelector,
  (state) => state.reloadAddedCities
);
