import { Component, inject, Input, OnInit } from '@angular/core';
import { City } from '../../model/city';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { reloadAddedCitiesAction } from '../../store/weather.actions';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnInit {
  @Input()
  city!: City;

  private _snackbar = inject(MatSnackBar);

  addedAlready = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (localStorage.getItem(this.city.name)) {
      this.addedAlready = true;
    }
  }

  addCity() {
    localStorage.setItem(this.city.name, this.city.name);
    if (localStorage.getItem(this.city.name)) {
      this._snackbar.open('City Has Been Added', '', { duration: 3000 });
      this.store.dispatch(reloadAddedCitiesAction());
      this.addedAlready = true;
    }
  }

  remove() {
    localStorage.removeItem(this.city.name);
    this.store.dispatch(reloadAddedCitiesAction());
    this.addedAlready = false;
  }
}
