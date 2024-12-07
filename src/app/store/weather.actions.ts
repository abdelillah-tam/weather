import { createAction, props } from '@ngrx/store';
import { City } from '../model/city';

export const LOAD_WEATHER = '[Dashboad Component] load weather of city';
const SUCCESS_LOADING = '[Effect] loaded successfully';
const FAILED_LOADING = '[Effect] loading is failed';
const RELOAD_ADDED_CITIES = '[Info Component] reload added city';
const STOP_RELOADING = '[Cities Component] stop reloading';

export const loadCityWeatherAction = createAction(
  LOAD_WEATHER,
  props<{ cityName: string; loading: boolean }>()
);

export const successLoadingAction = createAction(
  SUCCESS_LOADING,
  props<{ cityObj: City }>()
);

export const failedLoadingAction = createAction(
  FAILED_LOADING,
  props<{ error: number }>()
);

export const reloadAddedCitiesAction = createAction(RELOAD_ADDED_CITIES);
export const stopReloadingAction = createAction(STOP_RELOADING);
