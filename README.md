# Weather

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Tech used:
- NgRx Store
- RxJs
- HttpClient
- OpenWeatherMap (Search by city name)

There are three components (Dashboard, Info, Cities), Dashboard components contains Info and Cities, Info component shows weather's city that user searched for, Cities component shows cities that is saved in local storage.

### NgRx Files:
- Actions file:
  Contains **loadCityWeatherAction** for getting searched city, **successLoadingAction** if city is found, **failedLoadingAction** if not.
  **reloadAddedCitiesAction** called when a city added to local storage or removed, **stopReloadingAction** to tell that loading is finished.
