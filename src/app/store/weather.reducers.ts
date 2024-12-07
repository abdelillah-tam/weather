import { createReducer, on } from '@ngrx/store';
import { City } from '../model/city';
import {
  failedLoadingAction,
  loadCityWeatherAction,
  reloadAddedCitiesAction,
  stopReloadingAction,
  successLoadingAction,
} from './weather.actions';

const initialState: {
  city: City | undefined;
  loading: boolean;
  error: number | undefined;
  reloadAddedCities: boolean;
} = {
  city: undefined,
  loading: false,
  error: undefined,
  reloadAddedCities: false,
};

export const weatherReducer = createReducer(
  initialState,
  on(loadCityWeatherAction, (state) => ({
    ...state,
    loading: true,
  })),
  on(successLoadingAction, (state, data) => ({
    ...state,
    city: data.cityObj,
    loading: false,
  })),
  on(failedLoadingAction, (state, data) => ({
    ...state,
    error: data.error,
    loading: false,
  })),
  on(reloadAddedCitiesAction, (state, data) => ({
    ...state,
    reloadAddedCities: true,
  })),
  on(stopReloadingAction, (state, data) => ({
    ...state,
    reloadAddedCities: false,
  }))
);
