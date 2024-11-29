import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

//import * as configActions from './config.actions';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions) {}
}