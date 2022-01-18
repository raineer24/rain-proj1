import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
// import * as AuthActions from "../../store/actions/auth.actions";
import * as UserActions from "../../store/actions/user.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
import { UserState } from "../../store/reducers/user.reducer";

import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
  exhaustMap,
  delay,
} from "rxjs/operators";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { merge, Observable, of } from "rxjs";
import { AuthService } from "../../core/services/auth.service";

import {
  login,
  loginSuccess,
  loggedOut,
  logout,
  register,
  registerSuccess,
  getUser,
  getUserSuccess,
} from "../actions/auth.actions";
import { SetError } from "../actions/http-errors.actions";

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() => {
        return this.authService.getDevelopers().pipe(
          map((users) => UserActions.loadUsersSuccess(users)),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<UserState>
  ) {}
}
